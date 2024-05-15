
const monsters = {
	Kusashi:{
		position: {
		x: 280,
		y: 325
		},
		image: {
			src: './img/pkm1_11zon.png'},
		frames: {
			max: 4,
			hold: 30
		},
		animate : true,
		name: 'Kusashi',
		attacks: [attacks.Tackle, attacks.PlantSpike]
	},
	Yveltal: {
		position: {
			x: 700,
			y: 150
		},
		image: {
			src: './img/717_0(1).png'
		},
		frames: {
			max: 4,
			hold: 30
		},
		animate : true,
		isEnemy: true,
		name: 'Yveltal',
		attacks: [attacks.Tackle, attacks.Fireball]
		},
	Emby: {
		position: {
			x: 700,
			y: 150
		},
		image: {
			src: './img/718s_0.png'
		},
		frames: {
			max: 4,
			hold: 30
		},
		animate : true,
		isEnemy: true,
		name: 'Yveltal',
		attacks: [attacks.Tackle, attacks.Fireball]
		}



}