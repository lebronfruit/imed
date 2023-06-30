const iphoneCanvas = document.getElementById('iphoneCanvas')
const ipctx = iphoneCanvas.getContext('2d')
iphoneCanvas.width = 14 * 64
iphoneCanvas.height = 150

setInterval(() => {
    Iphone.update()
}, 1000 * 0.1)

Iphone.initialize('../../')



const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
c.canvas.width = 14 * 64 //window.innerWidth;
c.canvas.height = 24 * 64 //window.innerHeight;

GameOver.setup()

c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)

const mapImage = new Image()
mapImage.onload = () => {
    animate()
}
mapImage.src = 'assets/map.png'


/*
function createPawnTest() {
    var pawn = new Pawn({ pos: { x: waypoints[0].x, y: waypoints[0].y } })
    return pawn
}
for (var i = 0; i < 5; i++) {
    setTimeout(createPawnTest, 1000 * 2 * i)
}
*/

const TRIGGER_RANGE_SPAN = 5
function clamp(num, min, max) {
   return Math.min(Math.max(num, min), max)
}


const TOWERSPAN_X = 9 * 32
const TOWER_PATHFIX = 32
const TOWER_FRONTIER_Y = 4 * 32
var kingTowerA = new KingTower({ pos: { x: canvas.width / 2, y: 18 * 64 - TOWER_PATHFIX } })
var towerA1 = new Tower({ pos: { x: canvas.width / 2 - TOWERSPAN_X, y: 18 * 64 - TOWER_PATHFIX - TOWER_FRONTIER_Y } })
var towerA2 = new Tower({ pos: { x: canvas.width / 2 + TOWERSPAN_X, y: 18 * 64 - TOWER_PATHFIX - TOWER_FRONTIER_Y } })

var kingTowerB = new KingTower({ pos: { x: canvas.width / 2, y: 18 * 64 - TOWER_PATHFIX } })
var towerB1 = new Tower({ pos: { x: canvas.width / 2 - TOWERSPAN_X, y: 18 * 64 - TOWER_PATHFIX - TOWER_FRONTIER_Y } })
var towerB2 = new Tower({ pos: { x: canvas.width / 2 + TOWERSPAN_X, y: 18 * 64 - TOWER_PATHFIX - TOWER_FRONTIER_Y } })

Player.A = new Player('Medico777')
Player.B = new Player('RandomGPT')

Player.A.setAsMyTower(kingTowerA)
Player.A.setAsMyTower(towerA1)
Player.A.setAsMyTower(towerA2)
Player.B.setAsMyTower(kingTowerB)
Player.B.setAsMyTower(towerB1)
Player.B.setAsMyTower(towerB2)

Client.setCurrentPlayer(Player.A)


let x = 0
function loop() {
    
   setTimeout(() => {
        const pos = { x: 0, y: 20 * 64 }
        const pawn = new Pawn({ pos: pos })
        Player.B.setAsMyPawn(pawn)

        loop()
   }, x == 0 ? 0 : 1000 * 2)
    x = 1
    
}

loop()



function animate() {
    //c.canvas.width = 14 * 64 / 2 //window.innerWidth;
    //c.canvas.height = 24 * 64 / 2 //window.innerHeight;
    requestAnimationFrame(animate)

    c.drawImage(mapImage, 0, 0) //drawing background

    //drawing map gradient-shadows
    var x = 0
    var y = 0
    var length = 500 
    var grd = c.createLinearGradient(x, y, x + 0, y + length)
    grd.addColorStop(0, "rgba(0, 0, 0, 0.7)");
    grd.addColorStop(0.2, "rgba(0, 0, 0, 0.55)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0)");

    c.fillStyle = grd
    c.fillRect(0, 0, canvas.width, length)

    var length = 500 +  4 * 64
    var x = 0
    var y = 20*64-length
    var grd = c.createLinearGradient(x, y, x + 0, y + length)
    grd.addColorStop(0, "rgba(0, 0, 0, 0)");
    grd.addColorStop(0.8, "rgba(0, 0, 0, 0.55)");
    grd.addColorStop(1, "rgba(0, 0, 0, 0.7)");

    c.fillStyle = grd
    c.fillRect(x, y, canvas.width, length)

    c.fillStyle = 'rgba(0, 0, 0, 0.7)'
    c.fillRect(x, y+length, canvas.width, length)


    PlacementTile.updateTiles()


    //Waypoint.draw()

    DeckCard.isDragging = DeckCard.isDragging && !Quiz.current
    if (DeckCard.isDragging && DeckCard.selection && !DeckCard.active
        && PlacementTile.active) {
        DeckCard.selection.selectionPawn.drawGlowRange(PlacementTile.active.pos.x, PlacementTile.active.pos.y)
    }

    Tower.updateTowers()
    Projectile.updateProjectiles()

    Pawn.list.forEach(pawn => {
        pawn.update()
    })
    if (Match.state == 'Playing') {
        if (DeckCard.isDragging && DeckCard.selection && !DeckCard.active
            && PlacementTile.active
            && !Quiz.current) {
            DeckCard.selection.selectionPawn.drawGlow(PlacementTile.active.pos.x, PlacementTile.active.pos.y)

        }

        Elixir.update()
        DeckCard.drawCards()
        Player.drawNicknames()

        Quiz.updateQuizzes()
    }
    if (Match.state == 'Game Over') {
        DeckCard.isDragging = false
        GameOver.update()
    }

    c.fillStyle = 'white'
    c.fillRect(mouse.x, mouse.y, 5, 5)
}

mouse.playX = 0
mouse.playY = 0

mouse.clampPlayGround = function() {
    mouse.playX = mouse.x
    const startHeight = 10 * 64 + 25
    const endHeight = 19 * 64
    mouse.playY = mouse.y
    //mouse.playY = mouse.y < startHeight ? startHeight : mouse.y
    //mouse.playY = mouse.playY > endHeight ? endHeight : mouse.playY
}

for (var i = 0; i < 4; i++) {
    DeckCard.pileToDeck()
}
canvas.addEventListener('mouseup', (event) => {
    DeckCard.isDragging = false

    if (DeckCard.selection && !DeckCard.active
        && PlacementTile.active 
        && Elixir.elixir >= DeckCard.selection.selectionPawn.elixirCost
        && !Quiz.current    ) {

        const coord = { x: PlacementTile.active.getCenter().x, y: PlacementTile.active.getCenter().y }
        DeckCard.selection.play(coord.x, coord.y)   //convert into orientedPositionCoords

        /*socket.emit('playCard', { x: PlacementTile.active.getCenter().x, y: PlacementTile.active.getCenter().y }, (error) => {

        })*/
        DeckCard.pileToDeck()
    }

    
})

canvas.addEventListener('mousedown', (event) => {
    DeckCard.isDragging = true

    if (Match.state == "Playing") {
        Quiz.clickAQuiz()
        
    }
    else if (Match.state == 'Game Over') {
        GameOver.onCanvasClick()
    }
})

window.addEventListener('mousemove', (event) => {
    mouse.update(event)
    mouse.clampPlayGround()

    
    DeckCard.active = null
    for (var i = 0; i < DeckCard.list.length; i++) {
        const deckCard = DeckCard.list[i]
        if (deckCard.isHovering()) {
            DeckCard.active = deckCard
            DeckCard.selection = deckCard
            break
        }
    }
})


/*
// const ENDPOINT = 'url-of-web-page'
const ENDPOINT = 'http://localhost:5000'
var connectionOptions = { forceNew: false, reconnection: false, autoConnect: false }
var socket = io.connect(ENDPOINT, { transports: ['websocket'] } )//, connectionOptions)
socket.on('playCard', ({ x, y }) => {
    DeckCard.selection.play(x, y)   //convert into orientedPositionCoords
    console.log("client done playCard")
})
*/