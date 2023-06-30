const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.canvas.width = 14 * 64 //window.innerWidth; 896
ctx.canvas.height = 24 * 64 //window.innerHeight; 1536

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}


window.addEventListener('mousemove', (event) => {
   mouse.update(event)
})



function roundedSet(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

class App {

    static openApp = undefined
    static active = null
    static list = []
    static width = 160
    static height = App.width

    constructor() {
        this.onload = undefined
        this.image = undefined
        this.openAnimationFinished = false
        this.openAnimationActive = false
        this.openAnimationStart = undefined
        App.list.push(this)
    }

    getTransform() {
        const i = App.list.indexOf(this)
        const grid = {
            y: Math.floor(i / 4) + 1
        }
        grid.x = i % 4 + 1
        const transform = {
            x: (grid.x - 1) * (App.width + 50) + 55,
            y: (grid.y - 1) * (App.height + 50) + 55,
            width: App.width,
            height: App.height,
        }

        return transform
    }

    setTransform() {
        this.transform = this.getTransform()
    }

    draw() {
        ctx.beginPath();
        ctx.roundRect(this.transform.x, this.transform.y, this.transform.width, this.transform.height, [20]);
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        ctx.fill()
        ctx.strokeStyle = "black";
        ctx.lineWidth = 1
        
        if (!this.image) {
            ctx.stroke();
        }
        if (this.image) {
            ctx.save();
            roundedSet(this.transform.x, this.transform.y, this.transform.width, this.transform.height, 20);
            ctx.clip();
            ctx.drawImage(this.image, this.transform.x, this.transform.y, this.transform.width, this.transform.height)
            ctx.restore();

           
        }
        
    }

    update() {
        this.setTransform()
        this.draw()

       
    }

    

    isHovering() {
        return mouse.x > this.transform.x && mouse.x < this.transform.x + this.transform.width &&
            mouse.y > this.transform.y && mouse.y < this.transform.y + this.transform.height
    }

    static updateALL() {
        App.list.forEach(app => {
            app.update()
        })

        App.active = null
        for (let i = 0; i < App.list.length; i++) {
            const app = App.list[i]
            if (app.isHovering()) {
                App.active = app
                break
            }
        }

        if (App.openAnimationFinished) {
            //App.onload()
        }
        else if (App.openApp) {
            App.openApp.openAnimation()
        }
    }

    open() {
        this.openAnimationActive = true
        this.openAnimationStart = new Date().getTime()
        App.openApp = this
        
    }

    openAnimation() {
        const startTransform = this.getTransform()
        const goalTransform = {
            x: 0, y: 0,
            width: canvas.width, height: canvas.height,
        }

        const deltaTransform = {
            x: goalTransform.x - startTransform.x,
            y: goalTransform.y - startTransform.y,
            width: goalTransform.width - startTransform.width,
            height: goalTransform.height - startTransform.height,
        }
        const deltaTransform2 = {
            x: startTransform.x - goalTransform.x,
            y: startTransform.y - goalTransform.y,
            width: startTransform.width - goalTransform.width,
            height: startTransform.height - goalTransform.height,
        }

        const endtime = new Date().getTime() 
        const elapsedTime = endtime - this.openAnimationStart
        const alpha = clamp(elapsedTime / 300, 0, 1)
        const transform = {
            x: startTransform.x + deltaTransform.x * alpha,
            y: startTransform.y + deltaTransform.y * alpha,
            width: startTransform.width + deltaTransform.width * alpha,
            height: startTransform.height + deltaTransform.height * alpha,
        }

        ctx.beginPath();
        ctx.roundRect(transform.x, transform.y, transform.width, transform.height, [50 * (1-alpha)]);
        ctx.fillStyle = 'rgba(0, 0, 0,' + alpha ** 0.2 + ')'
        ctx.fill()

        if (alpha >= 1) {
            this.openAnimationFinished = true
            this.onload()
        }
    }

}

const apps = [
    {
        imageDirectory: 'assets/3AM-IMSSico.png',
        onload: function () {
            window.location.href = '../3AM-IMSS/index.html'
        },
    },
    {
        imageDirectory: 'assets/clashroyale.png',
        onload: function () {
            window.location.href = '../tower-defense/client/index.html'
        },
    }

]
apps.forEach(listedapp => {
    const app = new App()
    app.onload = listedapp.onload
    app.image = new Image()
    app.image.src = listedapp.imageDirectory
})

for (i = 0; i < 23; i++) {
    new App()
}


const iphoneWPimg = new Image()
iphoneWPimg.src = 'assets/iphoneWP.png'
setInterval(() => {
    

    ctx.drawImage(iphoneWPimg, 0, 0, canvas.width, canvas.height)

    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    App.updateALL()
    

}, 1000 * 0.02)

canvas.addEventListener('mousedown', (event) => {
    if (App.active) {
        App.active.open()
    }
})