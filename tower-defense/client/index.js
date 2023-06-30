const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
c.canvas.width = 14 * 64 //window.innerWidth;
c.canvas.height = 24 * 64 //window.innerHeight;


c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)



function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}



Quickstart.initiate()
CardManager.initiate()

class ViewManager {

    static viewpos = {x: 0, y: 0}
    static targetView = null
    static currentView = Quickstart
    static previousView = Quickstart
    static order = [CardManager, Quickstart]
    static startTime = null
    static elapsedAnim = { x: 0, y: 0 }

    static update() {
        ViewManager.view()

        Quickstart.update()
        CardManager.update()

        if (Quickstart.activeSlidetap) {
            ViewManager.targetView = Quickstart.activeSlidetap
        }
        else if (CardManager.activeSlidetap) {
            ViewManager.targetView = CardManager.activeSlidetap
        }
        else {
            ViewManager.targetView = null
        }
        
       // console.log("ViewManager.currentView:", ViewManager.currentView)
    }

    static switchView(target) {
        ViewManager.previousView = ViewManager.currentView
        ViewManager.currentView = target
        
        ViewManager.startTime = new Date().getTime()
    }

    static view() {
        const previousPos = ViewManager.previousView.getPos()
        const targetPos = ViewManager.currentView.getPos() 
        const deltaAnim = {
            x: targetPos.x - previousPos.x,
            y: targetPos.y - previousPos.y,
        }
        const animDuration = 250
        const endTime = new Date().getTime() 
        const elapsedTime = endTime - ViewManager.startTime
        /*console.log("startime:", ViewManager.startTime)
        console.log("endTime:", endTime)
        console.log("elapsedtime:", elapsedTime)*/
        let elapsedAlpha = clamp(elapsedTime / animDuration, 0, 1)
        elapsedAlpha = elapsedAlpha ** 0.7
        const elapsedAnim = {
            x: elapsedAlpha * deltaAnim.x,
            y: elapsedAlpha * deltaAnim.y
        }

        ViewManager.viewpos = {
            x: previousPos.x + elapsedAnim.x,
            y: previousPos.y + elapsedAnim.y
        }
        //console.log(ViewManager.currentView.name, ": ", ViewManager.viewpos)
    }

    static getViewPosFrom(page) {
        return {
            x: Math.floor(-ViewManager.viewpos.x + page.getPos().x),
            y: Math.floor(-ViewManager.viewpos.y + page.getPos().y),
        }
    }
}


function animate() {
    requestAnimationFrame(animate)

    

    ViewManager.update()

}
setTimeout(() => {
    animate()
}, 1000 * 0.1)

canvas.addEventListener('mouseup', (event) => {
    if (Quickstart.quickmatchButton.isHovering()) {
        Quickstart.quickmatchButton.onClick()
    }

    if (CardMaker.isOpen && !CardMaker.isHovering() || CardMaker.buttonCreate.isHovering()) {
        CardMaker.close()
    }

    if (CardManager.buttonAddCard.isHovering()) {
        CardManager.buttonAddCard.onClick()
    }
    

    if (ViewManager.targetView) {
        ViewManager.switchView(ViewManager.targetView)
        //console.log("switching to", ViewManager.targetView)
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.update(event)

    for (let i = 0; i < Button.list.length; i++) {
        const button = Button.list[i]
        button.isHovering()
    }
})

