const cardImg = new Image()
cardImg.src = 'assets/card.png'

class Card {

    
    static list = []
    static width = 150
    static height = 220

    constructor() {
        Card.list.push(this)
    }

    draw(coord) {
        c.drawImage(cardImg,
            -ViewManager.viewpos.x + (coord.x - 1) * (Card.width + 20) + 120,
            -ViewManager.viewpos.y + (coord.y - 1) * (Card.height + 20) + 320,
            Card.width, Card.height)
    }

    update() {
        
    }


}

for (let i = 0; i < 24; i++) {
    new Card()
}

const arrowImg = new Image()
arrowImg.src = 'assets/arrow.png'



const CMBgImg = new Image()
CMBgImg.src = 'assets/homepageBackground.png'

const cardRosterImg = new Image()
cardRosterImg.src = 'assets/cardroster.png'


class CardManager {

    static buttonAddCard = undefined
    static name = 'CardManager'
    static origin = { x: 0, y: 0 }
    static getPos() {
        return {
            x: CardManager.origin.x * canvas.width,
            y: 0,
        }
    }

    static getViewPos() {
        return ViewManager.getViewPosFrom(CardManager)
    }


    static activeSlidetap = false
    static isHoveringSlidetap() {
        const getPos = CardManager.getViewPos
        return (mouse.x > getPos().x + canvas.width - 60 && mouse.x < getPos().x + canvas.width
            && mouse.y > getPos().y && mouse.y < getPos().y + canvas.height)
    }

    static drawTapQstart() {
        //adding gradient
        var length = 60
        var x = CardManager.getViewPos().x + canvas.width - length
        var y = CardManager.getViewPos().y
        c.fillStyle = 'rgba(0, 0, 0, 0.5)'
        c.fillRect(x, y, length, canvas.height)

        const size = 60
        c.drawImage(arrowImg, x, y+canvas.height / 2 - size / 2, size, size)
    }
    
    static draw() {
        c.drawImage(CMBgImg, CardManager.getViewPos().x, CardManager.getViewPos().y, canvas.width, canvas.height) //drawing background

        CardManager.drawTapQstart()

        var deckTransform = {width: 150, height: 220}
        deckTransform.pos = {
            x: CardManager.getViewPos().x + canvas.width * 0.3 - deckTransform.width / 2,
            y: CardManager.getViewPos().y + 50
        }
        c.fillStyle = 'rgba(150, 150, 150, 1)'
        c.fillRect(deckTransform.pos.x, deckTransform.pos.y, deckTransform.width, deckTransform.height)

        const deckHorGrid = 4

        for (var i = 0; i < Card.list.length; i++) {
            const k = i+1
            const card = Card.list[i]
            var coord = { y: Math.ceil(k / deckHorGrid) }
            const column = (k % deckHorGrid) + 1
            coord.x = column
            //console.log("x:", coord.x, ", column:", column)
            card.draw(coord)
        }

    }
    

    static update() {
        CardManager.draw()
        CardManager.activeSlidetap = CardManager.isHoveringSlidetap() ? Quickstart : null
        CardManager.buttonAddCard.trackPosition({
            x: CardManager.getViewPos().x + canvas.width * 0.7 - CardManager.buttonAddCard.width / 2,
            y: CardManager.getViewPos().y + 100
        })
        CardManager.buttonAddCard.update()
        CardMaker.update()
    }

    static initiate() {
        CardManager.buttonAddCard = new Button({
            width: 200, height: 70,
            color: 'rgb(50, 150, 50)', anchor: 'center',
            text: 'Add Card', textSize: '35px', roundCorner: 15,
        }, function () {
            CardMaker.open()
        })

        CardMaker.initiate()
    }

}

class CardMaker {

    static frameTransform = undefined
    static isOpen = false

    constructor() {

    }

    static draw() {
        var frameTransform = {
            width: canvas.width * 0.85,
            pos: {x: 0, y: 0},
        }
        frameTransform.height = frameTransform.width + 200
        frameTransform.pos.x = canvas.width / 2 - frameTransform.width / 2
        frameTransform.pos.y = canvas.height / 2 - frameTransform.height / 2

        CardMaker.frameTransform = frameTransform

        //border color
        c.beginPath();
        c.roundRect(frameTransform.pos.x, frameTransform.pos.y, frameTransform.width, frameTransform.height, 15);
        c.fillStyle = "rgba(100, 100, 100, 1)"
        c.fill()
        c.strokeStyle = "rgb(150, 150, 150)";
        c.lineWidth = 3
        c.stroke();

        const tabSize = 100
        const borderSize = 30

        //rect color
        c.beginPath();
        c.roundRect(frameTransform.pos.x + borderSize, frameTransform.pos.y + tabSize,
            frameTransform.width - borderSize * 2,
            frameTransform.height - tabSize - borderSize, 15);
        c.fillStyle = "rgba(220, 220, 220, 1)"
        c.fill()
        c.strokeStyle = "white";
        c.lineWidth = 5
        c.stroke();

        //groupy back color
        c.beginPath();
        c.roundRect(frameTransform.pos.x + 300,
            frameTransform.pos.y + 110,
            600,
            90, 15);
        c.fillStyle = "rgba(252, 132, 3, 1)"
        c.fill()
        //c.strokeStyle = "rgb(150, 150, 150)";
        //c.lineWidth = 3
        //c.stroke();


        //rarity titles
        c.font = 'bold ' + 30 + 'px sans-serif'
        c.fillStyle = "rgb(255, 255, 255)"
        c.textAlign = "left"
        var textpos = {
            x: frameTransform.pos.x + 320,
            y: frameTransform.pos.y + 145,
        }

        c.fillText('Rarity',
            textpos.x,
            textpos.y
        )

        //rarity
        c.font = 'bold ' + 60 + 'px sans-serif'
        c.fillStyle = "rgb(255, 255, 255)"
        c.textAlign = "left"
        var textpos = {
            x: textpos.x,
            y: textpos.y + 60,
        }

        c.fillText('Rare',
            textpos.x,
            textpos.y
        )


        c.drawImage(cardImg, frameTransform.pos.x + 60, frameTransform.pos.y + 110, 190, 250) //drawing background

        //answer title
        c.font = 'bold ' + 35 + 'px sans-serif'
        c.fillStyle = "rgb(50, 50, 50)"
        c.textAlign = "left"
        var center = {
            x: frameTransform.pos.x + 60,
            y: frameTransform.pos.y + 465 - 20,
        }

        c.fillText('ANSWERS',
            center.x,
            center.y
        )

        //type titles
        c.font = 'bold ' + 30 + 'px sans-serif'
        c.fillStyle = "rgb(255, 255, 255)"
        c.textAlign = "left"
        var textpos = {
            x: frameTransform.pos.x + 500,
            y: frameTransform.pos.y + 145,
        }

        c.fillText('Type',
            textpos.x,
            textpos.y
        )

        //type
        c.font = 'bold ' + 60 + 'px sans-serif'
        c.fillStyle = "rgb(255, 255, 255)"
        c.textAlign = "left"
        var textpos = {
            x: textpos.x,
            y: textpos.y + 60,
        }

        c.fillText('Troop',
            textpos.x,
            textpos.y
        )


        c.drawImage(cardImg, frameTransform.pos.x + 60, frameTransform.pos.y + 110, 190, 250) //drawing background

        //answer title
        c.font = 'bold ' + 35 + 'px sans-serif'
        c.fillStyle = "rgb(50, 50, 50)"
        c.textAlign = "left"
        var center = {
            x: frameTransform.pos.x + 60,
            y: frameTransform.pos.y + 465 - 20,
        }

        c.fillText('ANSWERS',
            center.x,
            center.y
        )


        //answers tiles
        const answerSize = {
            width: frameTransform.width / 2.4,
            height: 50,
        }
        const answers = ['yes', 'maybe', 'true', 'no']
        let mathem = {
            rows: Math.floor(answers.length / 2)
        }
        for (let i = 0; i < answers.length; i++) {
            const iRow = Math.floor(i / mathem.rows)
            const offset = {
                x: (iRow) * (answerSize.width + 10),
                y: i % mathem.rows * (answerSize.height + 10),
            }
            const answerTransform = {
                pos: {
                    x: frameTransform.pos.x + 60 + offset.x,
                    y: frameTransform.pos.y + 465 + offset.y,
                },
                width: answerSize.width,
                height: answerSize.height,
            }
            //rect color
            c.beginPath();
            c.roundRect(answerTransform.pos.x, answerTransform.pos.y,
                answerTransform.width, answerTransform.height
                , 15);
            if (i % 2 === 0) {
                c.fillStyle = "rgba(200, 200, 200, 1)"
            }
            else {
                c.fillStyle = "rgba(260, 260, 260, 1)"
            }
            
            c.fill()
            //c.strokeStyle = "white";
           // c.lineWidth = 5
           // c.stroke();

            c.font = 'Bold ' + 25 + 'px Arial'
            c.fillStyle = "rgb(50, 50, 50)"
            c.textAlign = "center"
            const center = {
                x: answerTransform.pos.x + answerTransform.width / 2,
                y: answerTransform.pos.y + answerTransform.height / 2,
            }
            
            c.fillText(answers[i],
                center.x,
                center.y + 15
            )
            
            //c.strokeStyle = "black"
            //c.lineWidth = 1
            //c.strokeText(answers[i], center.x, center.y)
            //c.textAlign = "left"


        }

       

        c.save()
        c.globalAlpha = 0.1
        c.drawImage(cardRosterImg, frameTransform.pos.x, frameTransform.pos.y + 15,
            frameTransform.width, frameTransform.height) //drawing background
        
        c.restore()
    }

    static update() {
        if (CardMaker.isOpen == true) {
            CardMaker.draw()
            CardMaker.buttonCreate.trackPosition({
                x: CardMaker.frameTransform.pos.x + CardMaker.frameTransform.width - CardMaker.buttonCreate.width + 20,
                y: CardMaker.frameTransform.pos.y + CardMaker.frameTransform.height - CardMaker.buttonCreate.height - 3
            })
            CardMaker.buttonCreate.update()
        }
    }

    static open() {
        CardMaker.isOpen = true
    }

    static close() {
        CardMaker.isOpen = false
    }

    static isHovering() {
        const transform = CardMaker.frameTransform
        return mouse.x > transform.pos.x && mouse.x < transform.pos.x + transform.width &&
            mouse.y > transform.pos.y && mouse.y < transform.pos.y + transform.height
    }

    static buttonCreate = undefined
    static initiate() {
        CardMaker.buttonCreate = new Button({
            width: 200, height: 80,
            color: colorKingYellow, anchor: 'center',
            text: 'Create', textSize: '35px', roundCorner: 15,
        }, function () {
            CardMaker.close()
        })
    }

}