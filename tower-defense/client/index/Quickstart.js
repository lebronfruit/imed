const QSBgImage = new Image()
QSBgImage.src = 'assets/homepageBackground.png'

const arenafloaterImg = new Image()
arenafloaterImg.src = 'assets/arena1floater.png'

class Quickstart {

    static name = 'Quickstart'
    static origin = { x: 1, y: 0 }
    static getPos() {
        return {
            x: Quickstart.origin.x * canvas.width,
            y: 0,
        }
    }
   

    static getViewPos() {
        return ViewManager.getViewPosFrom(Quickstart)
    }
    

    static activeSlidetap = false
    static isHoveringSlidetap() {
        const getPos = Quickstart.getViewPos
        return (mouse.x > getPos().x && mouse.x < getPos().x + 40
            && mouse.y > getPos().y && mouse.y < getPos().y + canvas.height)
    }

    static draw() {
        c.drawImage(QSBgImage, Quickstart.getViewPos().x, Quickstart.getViewPos().y, canvas.width, canvas.height) //drawing background
        c.drawImage(arenafloaterImg, Quickstart.getViewPos().x + canvas.width / 2 - 220, Quickstart.getViewPos().y + canvas.height / 2 - 330, 440, 440)

    }

    static drawTapCManager() {
        //adding gradient
        var x = Quickstart.getViewPos().x
        var y = Quickstart.getViewPos().y
        var length = 40
        //console.log('crealineargradient x, y, l, y', x, y, length, y)
        var grd = c.createLinearGradient(x, y, length, y)
        grd.addColorStop(0.2, "rgba(0, 0, 0, 0.7)");
        grd.addColorStop(0.5, "rgba(0, 0, 0, 0.4)");
        grd.addColorStop(1, "rgba(0, 0, 0, 0)");

        c.fillStyle = 'rgba(0, 0, 0, 0.5)'
        c.fillRect(x, y, length, canvas.height)

        c.save()
        c.rotate(Math.PI * 1)
        const size = 40
        c.drawImage(arrowImg, x-size, y-canvas.height / 2 - size / 2, size, size)
        c.restore()
    }

    static quickmatchButton = null
    static update() {
        Quickstart.draw()
        Quickstart.drawTapCManager()
        Quickstart.activeSlidetap = Quickstart.isHoveringSlidetap() ? CardManager : null
        Quickstart.quickmatchButton.trackPosition({ x: Quickstart.getViewPos().x + canvas.width / 2, y: Quickstart.getViewPos().y + canvas.height * 0.63 })
        Quickstart.quickmatchButton.update()
        
    }

    static initiate() {
        Quickstart.quickmatchButton = new Button({
            width: 450, height: 130,
            color: colorKingYellow, anchor: 'center',
            text: 'Quick Match!'
        }, function () {
            window.location.href = 'game.html'
        })
    }

    
}


