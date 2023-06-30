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

setInterval(function () {
    ctx.drawImage(mapImg, 0, 0, canvas.width, canvas.height)
    /*
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    */
    Patient.updatePatients()
    Player.updatePlayers()
    Dialogue.update()
}, World.speed)