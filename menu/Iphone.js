const homeButImg = new Image()
homeButImg.src = ''

class Iphone {

    static relativeUrl = undefined

    static draw() {
        var canvas = iphoneCanvas
        ipctx.fillStyle = 'black'
        ipctx.fillRect(0, 0, canvas.width, canvas.height)

        
        ipctx.beginPath();
        ipctx.arc(canvas.width/2, canvas.height/2, 50, 0, 2 * Math.PI);
        ipctx.fillStyle = 'black'
        ipctx.lineWidth = 8
        ipctx.strokeStyle = 'rgba(30, 30, 30, 1)'
        ipctx.stroke();
        ipctx.fill()

        ipctx.drawImage(homeButImg, canvas.width/2 - 50, canvas.height/2 - 50, 100, 100)
    }

    static isHoveringCircle() {
        const center = {
            x: iphoneCanvas.width / 2,
            y: canvas.height + iphoneCanvas.height / 2,
        }
        return (Math.abs(center.x - mouse.x) < 50 &&
            Math.abs(center.y - mouse.y) < 50)
    }

    static update() {
        Iphone.draw()
    }


    static initialize(relativeUrl) {
        homeButImg.src = relativeUrl + '/menu/assets/iphoneHomeButton.png'
        Iphone.relativeUrl = relativeUrl
        iphoneCanvas.addEventListener('mousedown', (event) => {
            if (Iphone.isHoveringCircle()) { 
                window.location.href = relativeUrl + '/menu/index.html'
            }
})
    }

}

