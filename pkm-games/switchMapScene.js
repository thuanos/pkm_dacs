const canvas1 = document.querySelector('canvas')
const c1 = canvas1.getContext('2d')

canvas1.width = 1024
canvas1.height = 576

const collisionMap1 =  []

for(let i = 0; i < collisionsDataMap.length; i+= 70) {
	collisionMap1.push(collisionsDataMap.slice(i, 70 + i))
}

const battleZoneMap1 =  []

for(let i = 0; i < battleFight.length; i+= 70) {
	battleZoneMap1.push(battleFight.slice(i, 70 + i))
}

const battleZone1 = []

class Boundary1 {
	static width1 = 48
	static height1 = 48
	constructor({position1}) {
		this.position1 = position1
		this.width = 48
		this.height = 48
	}

	draw1() {
		c1.fillStyle = 'rgba(255, 0, 0 , 0)'
		c1.fillRect(this.position1.x,this.position1.y, this.width, this.height)
	}
}
const boundaries1 = []
const offset1 = {
	x: -100,
	y: -230
}

collisionMap1.forEach((row,i) =>{
	row.forEach((symbol,j) => {
		if(symbol === 4930)
		boundaries1.push(new Boundary1({
			position1: {
				x: j*Boundary1.width1 + offset1.x,
				y: i*Boundary1.height1 + offset1.y
			}
		}))
	})
})

battleZoneMap1.forEach((row,i) =>{
	row.forEach((symbol,j) => {
		if(symbol === 4930)
		battleZone1.push(new Boundary1({	 
			position1: {
				x: j*Boundary1.width1 + offset1.x,
				y: i*Boundary1.height1 + offset1.y
			}
		}))
	})
})

const switchBackgroundImage = new Image()
	switchBackgroundImage.src = './img/pok.png'

const playerImage1 = new Image()
playerImage1.src = './img/1.png'

const playerImageUp1 = new Image()
playerImageUp1.src = './img/4.png'
const playerImageLeft1 = new Image()
playerImageLeft1.src = './img/2.png'
const playerImageRight1 = new Image()
playerImageRight1.src = './img/3.png'

const battle1 = {
	initiated: false
}
function drawPlayerName1() {
  c.fillStyle = 'black';
  c.font = '12px Arial';
  c.textAlign = 'center';
  c.fillText(playerName, player.position.x + player.width / 2, player.position.y - 10);
}

class Sprite1{
	constructor({ position1, velocity1, image1, frames1 = {max: 1}, sprites1  }){
		this.position1 = position1
		this.image1 = image1
		this.frames1 = {...frames1, val: 0, elapsed: 0}
		this.sprites1 = sprites1
		this.image1.onload = () => {
			this.width = this.image1.width / this.frames1.max
			this.height = this.image1.height
		}
		this.moving1 = false
	}

	draw1(){
		
		c1.drawImage(
			this.image1, 
			this.frames1.val * this.width,
			0,
			this.image1.width / this.frames1.max,
			this.image1.height,
			this.position1.x,
			this.position1.y,
			this.image1.width /this.frames1.max,
			this.image1.height
		)
		if(!this.moving1)  return
		if(this.frames1.val > 1){
			this.frames1.elapsed++
		}
		if(this.frames1.elapsed % 20 === 0) {
		if(this.frames1.val < this.frames1.max - 1 ) {
			this.frames1.val++
		} else this.frames1.val = 0
	}
	}
}

const player1 = new Sprite1 ({
	position1: {
		x: canvas1.width / 2 - 192 / 4 / 2,
		y: canvas1.height / 2 - 68 / 2
	},
	image1: playerImage1,
	frames1: {
		max: 4
	},
	sprites1: {
		up: playerImageUp1,
		left: playerImageLeft1,
		right: playerImageRight1,
		down: playerImage1
	}
})

const background1 = new Sprite1({ 
	position1: {
		x: offset1.x,
		y: offset1.y
	},
	image1: switchBackgroundImage
})

const keys1 = {
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
	q:{
		pressed: false
	}

}
const switchM1 ={
	initiated: false
}
const switchZonesMap1 = []
for (let i = 0; i < switchZonesData1.length; i += 70) {
	switchZonesMap1.push(switchZonesData1.slice(i, 70 + i))
}
const switchZones1 = []
switchZonesMap1.forEach((row, i) => {
	row.forEach((symbol, j) => {
		if (symbol == 1025)
		switchZones1.push(
			new Boundary({
				position:{
					x: j * Boundary.width + offset.x,
					y: i * Boundary.height + offset.y
				}
			})
		)
	})
})
const movables1 = [background1, ...boundaries1, ...battleZone1, ...switchZones1]

function retangularCollision({retangle1, retangle2}) {
	return	(
		retangle1.position1.x + retangle1.position1.y >= retangle2.position1.x && 
		retangle1.position1.x <= retangle2.position1.x + retangle2.width &&
		retangle1.position1.y <= retangle2.position1.y + retangle2.height &&
		retangle1.position1.y + retangle1.height >= retangle2.position1.y
	)
} 


function animateSwitch() {
	const animationId1 = window.requestAnimationFrame(animateSwitch)
	switchZones1.forEach(switchZone => {
		switchZone1.draw()
	})
	background1.draw1()
	boundaries1.forEach((boundary1) => {
		boundary1.draw1()
	})
	battleZone1.forEach((battleZones1) => {
		battleZones1.draw1()
	})
	player1.draw1();
	drawPlayerName1();
	let moving1 = true
	player1.moving1 = false

	if(battle1.initiated) return
	if(keys1.w.pressed || keys1.a.pressed || keys1.s.pressed || keys1.d.pressed) {
		for(let i = 0;i<battleZone1.length;i++){
			const battleZones1 = battleZone1[i]
			const overlappingArea1 = (Math.min(
				player1.position1.x + player1.width,
				battleZones1.position1.x + battleZones1.width
			) - Math.max(player1.position1.x, battleZones1.position1.x)) *
			(Math.min(
				player1.position1.y + player1.height,
				battleZones1.position1.y + battleZones1.height
			) - Math.max(player1.position1.y, battleZones1.position1.y))
			if(
				retangularCollision({
					retangle1: player1,
					retangle2: battleZones1
				}) && overlappingArea1 > (player1.width * player1.height) / 2 &&
				Math.random() < 0.005
			){
				window.cancelAnimationFrame(animationId1)
			
				audio.map2.stop()
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
								initBattle1()
								animateBattle1()
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
		window.cancelAnimationFrame(animationId1)

		audio.map2.stop()
		audio.accept.play()
		audio.Map.play()
		switchM1.initiated = true
		gsap.to('#overlapping', {
			onComplete(){
				gsap.to('#overlapping',{
					opacity: 1,
					duration: 0.4,
					onComplete(){
					 	animate()
						gsap.to('#overlapping',{
							opacity: 0,
							duration: 0.4
						})
					}
				})	
			}
		})						
}
	if(keys1.w.pressed && lastKey === 'w') {
		player1.moving1 = true
		player1.image1 = player1.sprites1.up
		for(let i=0;i<boundaries1.length;i++) {
			const boundary1 = boundaries1[i]
			if(retangularCollision({
				retangle1: player1,
				retangle2: {...boundary1, position1: {
					x: boundary1.position1.x,
					y: boundary1.position1.y + 3
				}}
			})) {
				moving1 = false
				break
				
			}
		}
		if(moving1) {
			movables1.forEach((movable) => {
				movable.position1.y += 3
			})
		}
	}
	else if(keys1.a.pressed && lastKey === 'a') {
		player1.moving1 = true
		player1.image1 = player1.sprites1.left
		for(let i=0;i<boundaries1.length;i++) {
			const boundary1 = boundaries1[i]
			if(retangularCollision({
				retangle1: player1,
				retangle2: {...boundary1,
					position1: {
						x: boundary1.position1.x + 3,
						y: boundary1.position1.y
				}}
			})
			) {
				moving1 = false
				break
			}
		}
		if(moving1) {
		movables1.forEach((movable) => {
			movable.position1.x += 3
		})}
	}
	else if(keys1.s.pressed && lastKey === 's') {
		player1.moving1 = true
		player1.image1 = player1.sprites1.down
		for(let i=0;i<boundaries1.length;i++) {
			const boundary1 = boundaries1[i]
			if(retangularCollision({
				retangle1: player1,
				retangle2: {...boundary1, position1: {
					x: boundary1.position1.x,
					y: boundary1.position1.y - 3
				}}
			})) {
				moving1 = false
				break
			}
		}
		if(moving1) {
			movables1.forEach((movable) => {
			movable.position1.y -= 3
		})}
	}
	else if(keys1.d.pressed && lastKey === 'd') {
		player1.moving1 = true
		player1.image1 = player1.sprites1.right
		for(let i=0;i<boundaries1.length;i++) {
			const boundary1 = boundaries1[i]
			if(retangularCollision({
				retangle1: player1,
				retangle2: {...boundary1, position1: {
					x: boundary1.position1.x - 3,
					y: boundary1.position1.y
				}}
			})) {
				moving1 = false
				break
			}
		}
		if(moving1) {
		movables1.forEach((movable)=> {
			movable.position1.x -= 3
		})}
	}
}



window.addEventListener('keydown', (e) => {
	switch (e.key){
	case 'w':
		keys1.w.pressed = true
		lastKey = 'w'
		break
	case 'a':
		keys1.a.pressed = true
		lastKey = 'a'
		break
	case 's':
		keys1.s.pressed = true
		lastKey = 's'
		break
	case 'd':
		keys1.d.pressed = true
		lastKey = 'd'
		break
	case 'q':
		keys1.q.pressed = true
		lastKey = 'q'
		break
	}
})
window.addEventListener('keyup', (e) => {
	switch (e.key){
	case 'w':
		keys1.w.pressed = false
		break
	case 'a':
		keys1.a.pressed = false
		break
	case 's':
		keys1.s.pressed = false
		break
	case 'd':
		keys1.d.pressed = false
		break
	case 'q':
		keys1.q.pressed = false
		break
	}
})