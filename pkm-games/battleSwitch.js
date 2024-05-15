const battleBackgroundImage1 = new Image()
	battleBackgroundImage1.src = './img/battleBG.jpg'
const battleBackground1 = new Sprite({position: {
	x: 0,
	y: 0
	},
	image: battleBackgroundImage1
})

function initBattle1() {
	document.querySelector('#userInterface').style.display = 'block'
	document.querySelector('#dialogueBox').style.display = 'none'
	document.querySelector('#enemyHealthBar').style.width = '100%'
	document.querySelector('#playerHealthBar').style.width = '100%'
	document.querySelector('#attacksBox').replaceChildren()
	draggle = new Monster(monsters.Emby)
	emby = new Monster(monsters.Kusashi)
	renderedSprite= [draggle, emby]
	queue = []

	emby.attacks.forEach(attack => {
		const button = document.createElement('button')
		button.innerHTML = attack.name
		document.querySelector('#attacksBox').append(button)
	})

	document.querySelectorAll('button').forEach(button => {
	button.addEventListener('click', (e) => {
		const selectedAttack = attacks[e.currentTarget.innerHTML]
		emby.attack({ 
			attack: selectedAttack,
			recipient: draggle,
			renderedSprite
		})

		if (draggle.health <= 0){
			queue.push(() => {
				draggle.faint()	
			})
			queue.push(() => {
				gsap.to('#overlappingDiv', {
					opacity: 1,
					onComplete: () => {
						cancelAnimationFrame(battleAnimationId)
						animateSwitch()
						document.querySelector('#userInterface').style.display = 'none'
						gsap.to('#overlappingDiv', {
							opacity: 0
						})
						battle.initiated = false
						audio.map2.play()
					}
				})
			})
		}

		const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
		
		queue.push(() => {
			draggle.attack({ 
			attack: randomAttack,
			recipient: emby,
			renderedSprite
			})

			if (emby.health <= 0){
				queue.push(() => {
					emby.faint()	
				})

			queue.push(() => {
				gsap.to('#overlappingDiv', {
					opacity: 1,
					onComplete: () => {
						cancelAnimationFrame(battleAnimationId)
						animateSwitch()
						document.querySelector('#userInterface').style.display = 'none'
						gsap.to('#overlappingDiv', {
							opacity: 0
						})
						battle.initiated = false
						audio.map2.play()
					}
				})
			})
			
			}
		})
	})

	button.addEventListener('mouseenter', (e) => {
		const selectedAttack = attacks[e.currentTarget.innerHTML]
		document.querySelector('#attackType').innerHTML = selectedAttack.type
		document.querySelector('#attackType').style.color = selectedAttack.color
	})
})
}

function animateBattle1() {
	battleAnimationId = window.requestAnimationFrame(animateBattle1)
	battleBackground1.draw()

	renderedSprite.forEach((sprite) => {
		sprite.draw()
	})
}






document.querySelector('#dialogueBox').addEventListener('click', (e) => {
	if(queue.length > 0) {
		queue[0] ()
		queue.shift()
	} else e.currentTarget.style.display = 'none'
})