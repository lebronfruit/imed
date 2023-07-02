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

function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max)
}



const mapImg = new Image()
mapImg.src = 'assets/mapa.png'

const playerImg = new Image()
playerImg.src = 'assets/medic.png'

class World {
    static speed = 1000 / 100
}


const hospitalSound = new Audio('assets/mentalHospital.mp3');
var firstWindowClick = false
var firstSetupDone = false
setInterval(() => {
    if (firstWindowClick === true && firstSetupDone === false) {
        firstSetupDone = true

        
        hospitalSound.loop = true
        hospitalSound.play()
    }
})




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
    const dur = Math.random(3, 15)/10

    setTimeout(() => {
        lightsON = true
    }, 1000 * dur)

    setTimeout(() => {
        lightsON = false
    }, 1000 * (dur + 0.1))

    setTimeout(() => {
        tickLight()
    }, 1000 * (dur + 5))
}
tickLight()


function getDistance(a, b) {
    var deltaPosition = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y),
    }
    return Math.sqrt(deltaPosition.x ** 2 + deltaPosition.y ** 2)
}

const promptAudio = new Audio('assets/selectSound0.mp3');
const selectAudio = new Audio('assets/selectSound1.mp3');

setInterval(function () {
    ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height)
    /*
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    */

    

    if (Baldi.killedYou) {
        baldi.baldiKilledYou()
    }

    if (!Baldi.killedYou && GameState.state != 'game over') {
        Patient.updatePatients()
        Player.updatePlayers()

        if (lightsON == true) {
            baldi.move()
            baldi.draw()
        }
        else {
            baldi.playingFootsteps = false
        }

        baldi.update()

        if (lightsON == false) {
            ctx.fillStyle = 'rgba(20, 20, 50, 0.85)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        playerA.selection.bloodpressure = null
        for (let i = 0; i < Patient.list.length; i++) {
            const patient = Patient.list[i]
            if (patient.needs.bloodpressure === true
                && getDistance(patient.transform, playerA.transform) < 50) {
                
                playerA.selection.bloodpressure = patient
                break
            }
        }
    
        Patient.updateActions()
        Player.updateActions()
    }

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


window.addEventListener('mousedown', (event) => {
    firstWindowClick = true
})

window.addEventListener('mousemove', (event) => {
    mouse.update(event)
    if (mouse.down) {
        playerA.targetpoint = { x: mouse.x, y: mouse.y }
    }

})

canvas.addEventListener('mousedown', (event) => {
    mouse.down = true
    playerA.targetpoint = { x: mouse.x, y: mouse.y }

    if (playerA.can.bloodpressure()) {
        playerA.play.bloodpressure(playerA.selection.bloodpressure)
    }
})

canvas.addEventListener('mouseup', (event) => {
    mouse.down = false
})