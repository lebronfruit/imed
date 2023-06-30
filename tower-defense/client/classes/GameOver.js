const starImage = new Image()
starImage.src = 'assets/star.png'

const gameoverTagImage= new Image()
gameoverTagImage.src = 'assets/gameoverTag.png'

/*
function changeColor(imageData) {
	var data = imageData.data;
	for (var i = 0; i < data.length; i += 4) { // we are jumping every 4 values of RGBA for every pixel
		data[i] = data[i] - 199;      // the red color channel - we have decreased its value
		data[i + 1] = data[i + 1] - 199;  // the green color channel - we have decreased its value
		data[i + 2] = data[i + 2] + 100;  // the blue color channel - we have increased its value
	}
	c.putImageData(imageData, 0, 0);
};
*/


class GameOver {
	static okButton = undefined

	static draw() {
		const grd = c.createLinearGradient(0, 0, canvas.width, canvas.height);
		grd.addColorStop(0, "rgba(0, 0, 255, 0)");
		grd.addColorStop(0.6, "rgba(0, 0, 255, 0.6)");
		grd.addColorStop(1, "rgba(0, 0, 255, 0.6)");

		c.fillStyle = grd
		c.fillRect(0, 0, canvas.width, canvas.height)


		
		const center_hor = canvas.width / 2
		const center_ver = canvas.height * 0.5

		const tagSize = { x: 600, y: 200 }
		c.drawImage(gameoverTagImage,
			center_hor - tagSize.x / 2,
			center_ver - tagSize.y / 2,
			tagSize.x, tagSize.y)

		c.font = 'Bold 50px Arial'
		c.fillStyle = 'white'
		c.textAlign = 'center'
		c.fillText(Player.A.nickname, center_hor, center_ver - 8)

		const starSize = 160
		const starcenter_ver = center_ver - starSize * 0.9

		c.fillStyle = 'white';
		c.drawImage(starImage,
			center_hor - starSize / 2,
			starcenter_ver - starSize / 2,
			starSize, starSize)

		c.drawImage(starImage,
			center_hor - starSize / 2 - starSize * 1 ,
			starcenter_ver - starSize / 2 + starSize * 0.2,
			starSize, starSize)

		c.drawImage(starImage,
			center_hor - starSize / 2 + starSize * 1,
			starcenter_ver - starSize / 2 + starSize * 0.2,
			starSize, starSize)
		c.textAlign = 'left'

	}

	static update() {
		GameOver.draw()
		GameOver.okButton.isHovering()
		GameOver.okButton.trackPosition({ x: canvas.width / 2, y: canvas.height * 0.78 })
		GameOver.okButton.update()
	}

	static onCanvasClick() {
		if (GameOver.okButton.isHovering()) {
			GameOver.okButton.onClick()
		}
	}

	static setup() {
		GameOver.okButton = new Button({
			width: 200, height: 100,
			color: 'rgb(13, 94, 255)', anchor: 'center',
			text: 'OK'
		}, function () {
			window.location.href = 'index.html'
		})
	}

}