
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)	



const collisionsMap = []
for (let i = 0; i < collisions.length; i += 70) {
	collisionsMap.push(collisions.slice(i, 70 + i))
}
const battleZonesMap = []
for (let i = 0; i < battleZonesData.length; i += 70) {
	battleZonesMap.push(battleZonesData.slice(i, 70 + i))
}
const switchZonesMap = []
for (let i = 0; i < switchZonesData.length; i += 70) {
	switchZonesMap.push(switchZonesData.slice(i, 70 + i))
}


const boundaries = []
const offset = {
	x: -690,
	y: -520
}

collisionsMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol == 1025)
		boundaries.push(
			new Boundary({
				position:{
					x: j * Boundary.width + offset.x,
					y: i * Boundary.height + offset.y
				}
			})
		)
	})
})

const battleZones = []

battleZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol == 1025)
		battleZones.push(
			new Boundary({
				position:{
					x: j * Boundary.width + offset.x,
					y: i * Boundary.height + offset.y
				}
			})
		)
	})
})
const switchZones = []
switchZonesMap.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol == 1025)
		switchZones.push(
			new Boundary({
				position:{
					x: j * Boundary.width + offset.x,
					y: i * Boundary.height + offset.y
				}
			})
		)
	})
})
const image = new Image()
image.src = './img/PokeMap.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foreground.png'

const playerImage = new Image()
playerImage.src = './img/1.png'
const playerUpImage = new Image()
playerUpImage.src = './img/4.png'
const playerLeftImage = new Image()
playerLeftImage.src = './img/2.png'
const playerRightImage = new Image()
playerRightImage.src = './img/3.png'



function drawPlayerName() {
  c.fillStyle = 'black';
  c.font = '12px Arial';
  c.textAlign = 'center';
  c.fillText(playerName, player.position.x + player.width / 2, player.position.y - 10);
}

const player = new Sprite({
	position: {
		x: canvas.width / 2 - 192 / 4 / 2,
		y: canvas.height / 2 - 68 / 2
	},
	image: playerImage,
	frames: {
		max: 4,
		hold: 10
	},
	sprites: {
		up: playerUpImage,
		left: playerLeftImage,
		right: playerRightImage,
		down: playerImage
	}
	
})

const background = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	image: image
})

const foreground = new Sprite({
	position: {
		x: offset.x,
		y: offset.y
	},
	image: foregroundImage
})

const keys = {
	w: {
		pressed: false
	},
	a: {
		pressed: false
	},
	s: {
		pressed: false
	},
	d: {
		pressed: false
	},
	q: {
		pressed: false
	}
}



const movables = [background, ...boundaries, foreground, ...battleZones, ...switchZones]

function rectanguCollision({rectangle1, rectangle2}) {
	return (
		rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
		rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
		rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
		rectangle1.position.y + rectangle1.height >= rectangle2.position.y
		)
}


const battle  ={
	initiated: false
}
const switchM ={
	initiated: false
}

function animate(){
	const animationId = window.requestAnimationFrame(animate)	
	background.draw()
	switchZones.forEach(switchZone => {
		switchZone.draw()
	})
	boundaries.forEach(boundary => {
		boundary.draw()
	})
	battleZones.forEach(battleZone => {
		battleZone.draw()
	})
	player.draw();
  	drawPlayerName();
	foreground.draw()

	let moving = true
	player.animate = false

	if(battle.initiated) return

	if(keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed){
		for (let i=0; i< battleZones.length; i++){
			const battleZone = battleZones[i]
			const overlappingArea = 
				(Math.min(player.position.x + player.width, battleZone.position.x + battleZone.width) -
				Math.max(player.position.x, battleZone.position.x)) *
				(Math.min(player.position.y + player.height, battleZone.position.y + battleZone.height) -
				Math.max(player.position.y, battleZone.position.y))
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: battleZone
				}) &&
				overlappingArea > (player.width * player.height) / 2
				&& Math.random() < 0.005
			){
				window.cancelAnimationFrame(animationId)
			
				audio.Map.stop()
				audio.initBattle.play()
				audio.battle.play()

				battle.initiated = true
				gsap.to('#overlappingDiv', {
   					opacity: 1,
    				repeat: 3,
					yoyo: true,
					duration: 0.4,
					onComplete(){
						gsap.to('#overlappingDiv',{
							opacity: 1,
							duration: 0.4,
							onComplete(){
								initBattle()
								animateBattle()
								gsap.to('#overlappingDiv',{
									opacity: 0,
									duration: 0.4
								})
							}
						})	
					}
				})
				break
			}
		}
	}

	if(keys.q.pressed){
		for (let i=0; i< switchZones.length; i++){
			const switchZone = switchZones[i]
			const overlappingArea = 
				(Math.min(player.position.x + player.width, switchZone.position.x + switchZone.width) -
				Math.max(player.position.x, switchZone.position.x)) *
				(Math.min(player.position.y + player.height, switchZone.position.y + switchZone.height) -
				Math.max(player.position.y, switchZone.position.y))
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: switchZone
				}) &&
				overlappingArea > (player.width * player.height) / 2
			){
				window.cancelAnimationFrame(animationId)
			
				audio.Map.stop()
				audio.accept.play()
				audio.map2.play()
				switchM.initiated = true
				gsap.to('#overlapping', {
					onComplete(){
						gsap.to('#overlapping',{
							opacity: 1,
							duration: 0.4,
							onComplete(){
								animateSwitch()
								gsap.to('#overlapping',{
									opacity: 0,
									duration: 0.4
								})
							}
						})	
					}
				})
				break
			}
		}
	}
	
	if (keys.w.pressed && lastKey == 'w') {
		player.animate = true
		player.image = player.sprites.up
		for (let i=0; i< boundaries.length; i++){
			const boundary = boundaries[i]
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: {
					...boundary,
					position: {
						x: boundary.position.x,
						y: boundary.position.y + 3
				}
			}
				})
			){
				moving = false
				break
			}
		}
	if(moving)
		movables.forEach((movables) => {
			movables.position.y += 3
		})}
	else if (keys.a.pressed && lastKey == 'a') {
		player.animate = true
		player.image = player.sprites.left
		for (let i=0; i< boundaries.length; i++){
			const boundary = boundaries[i]
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: {
					...boundary,
					position: {
						x: boundary.position.x + 3,
						y: boundary.position.y 
				}
			}
				})
			){
				moving = false
				break
			}
		}
	if(moving)
		movables.forEach((movables) => {
			movables.position.x += 3
		})}
	else if (keys.s.pressed && lastKey == 's') {
		player.animate = true
		player.image = player.sprites.down
		for (let i=0; i< boundaries.length; i++){
			const boundary = boundaries[i]
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: {
					...boundary,
					position: {
						x: boundary.position.x,
						y: boundary.position.y - 3
				}
			}
				})
			){
				moving = false
				break
			}
		}
	if(moving)
		movables.forEach((movables) => {
			movables.position.y -= 3
		})}
	else if (keys.d.pressed && lastKey == 'd') {
		player.animate = true
		player.image = player.sprites.right
		for (let i=0; i< boundaries.length; i++){
			const boundary = boundaries[i]
			if (
				rectanguCollision({
				rectangle1: player,
				rectangle2: {
					...boundary,
					position: {
						x: boundary.position.x - 3,
						y: boundary.position.y 
				}
			}
				})
			){
				moving = false
				break
			}
		}
	if(moving)
		movables.forEach((movables) => {
			movables.position.x -= 3
		})}

}

animate() 
window.addEventListener('keydown', (e) => {
	switch (e.key){
	case 'w':
		keys.w.pressed = true
		lastKey = 'w'
		break
	case 'a':
		keys.a.pressed = true
		lastKey = 'a'
		break
	case 's':
		keys.s.pressed = true
		lastKey = 's'
		break
	case 'd':
		keys.d.pressed = true
		lastKey = 'd'
		break
	case 'q':
		keys.q.pressed = true
		lastKey = 'q'
		break
	}

	
})
window.addEventListener('keyup', (e) => {
	switch (e.key){
	case 'w':
		keys.w.pressed = false
		break
	case 'a':
		keys.a.pressed = false
		break
	case 's':
		keys.s.pressed = false
		break
	case 'd':
		keys.d.pressed = false
		break
	case 'q':
		keys.q.pressed = false
		break
	}
})

let clicked = false
addEventListener('click', () => {
	if(!clicked){
	audio.Map.play()
	clicked = true
	}
})