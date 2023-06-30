const iphoneCanvas = document.getElementById('iphoneCanvas')
const ipctx = iphoneCanvas.getContext('2d')
iphoneCanvas.width = 14 * 64
iphoneCanvas.height = 150

setInterval(() => {
    Iphone.update()
}, 1000 * 0.1)

Iphone.initialize('../')

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
ctx.canvas.width = 14 * 64 //window.innerWidth; 896
ctx.canvas.height = 24 * 64 //window.innerHeight; 1536



const mapImg = new Image()
mapImg.src = 'assets/mapa.png'

const playerImg = new Image()
playerImg.src = 'assets/medic.png'

class World {
    static speed = 1000 / 100
}



const baldi = new Baldi({ x: 100, y: 100, width: Baldi.width, height: Baldi.height })
const playerA = new Player("PlayerA", { x: 300, y: 600, width: Player.width, height: Player.height })

document.onkeydown = function (e) {
    if (e.code === 'KeyW') {
        playerA.move('forward', 1)
    }
    else if (e.code === "KeyS") {
        playerA.move('backward', 1)
    }
    else if (e.code === "KeyA") {
        playerA.move("left", 1)
    }
    else if (e.code === "KeyD") {
        playerA.move("right", 1)
    }
    //console.log(e);
};

document.onkeyup = function (e) {
    if (e.code === 'KeyW') {
        playerA.move('forward', 0)
    }
    else if (e.code === "KeyS") {
        playerA.move('backward', 0)
    }
    else if (e.code === "KeyA") {
        playerA.move("left", 0)
    }
    else if (e.code === "KeyD") {
        playerA.move("right", 0)
    }
    //console.log(e);
};

const myTexts = [
    'No puede ser quien dejo esta aguja aqui.',
    'Se supone que deba limpiar todo este desorden?',
    'Alguien esta tramando algo...',
    'No puedo encontrar ni a una sola enfermera.',
    'Donde estan todos?'
]
let x = 0
function read() {
    Dialogue.read(myTexts[x], function () {
        x++
        if (x >= myTexts.length) { x = 0 }
        read()
    })
    
}
read()

for (var i = 0; i < 4; i++) {
    const patient = new Patient({ x: 600, y: 500 + (i - 1) * 300 })

}

let lightsON = false
function tickLight() {
    setTimeout(() => {
        lightsON = true
    }, 1000 * 0.3)

    setTimeout(() => {
        lightsON = false
    }, 1000 * 0.4)

    setTimeout(() => {
        tickLight()
    }, 1000 * 5)
}
tickLight()

setInterval(function () {
    ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height)
    /*
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    */
    Patient.updatePatients()
    Player.updatePlayers()
    

    

    if (lightsON == false) {
        ctx.fillStyle = 'rgba(20, 20, 50, 0.85)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    if (lightsON == true) {
        baldi.move()
        baldi.draw()
    }
    baldi.update()

    GameState.update()

    if (!Baldi.killedYou && GameState.state != 'game over') {
        Dialogue.update()
    }
   
}, World.speed)


class Controller {

    static targetPos = {x: 0, y: 0}

    static update() {

    }

}

window.addEventListener('mousemove', (event) => {
    mouse.update(event)
    if (mouse.down) {
        playerA.targetpoint = { x: mouse.x, y: mouse.y }
    }
    
})

canvas.addEventListener('mousedown', (event) => {
    mouse.down = true
    playerA.targetpoint = { x: mouse.x, y: mouse.y }
})

canvas.addEventListener('mouseup', (event) => {
    mouse.down = false
})