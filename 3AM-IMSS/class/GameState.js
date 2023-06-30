class GameState {

	static state = 'playing'

	static gameover() {
		GameState.state = 'game over'
	}

	static update() {
		if (GameState.state === 'game over' || false) {
			ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
			ctx.fillRect(0, 0, canvas.width, canvas.height)

			ctx.textAlign = 'center'
			ctx.font = 'bold 100px sans-serif'
			ctx.fillStyle = 'red'
			const text = 'Reporte de caso: medico politraumatizado con multiples laceraciones en el abdomen.'

			let wrappedText = wrapText(ctx, text, canvas.width / 2, canvas.height / 2 - 300, 700, 100);
			// wrappedTe
			wrappedText.forEach(function (item) {
				// item[0] is the text
				// item[1] is the x coordinate to fill the text at
				// item[2] is the y coordinate to fill the text at
				ctx.fillText(item[0], item[1], item[2]);
			})

		}
	}
}