const cardImg = new Image()
cardImg.src = 'assets/card.png'


class DeckCard {
    static DECKCARD_STARTPOS = undefined;
    static DECKCARD_PADDING = 16;
    static active = null;
    static selection = null;
    static isDragging = false;

    constructor() {
        this.width = 120
        this.height = 170
        this.posOrigin = {x: 0, y: 0}
        this.posOffset = { x: 0, y: 0 }
        this.pos = this.posOrigin
        this.id = '' + Math.floor(Math.random() * 1000)
        this.selectionPawn = null
        DeckCard.list.push(this)

        DeckCard.DECKCARD_STARTPOS = { x: 230, y: canvas.height - 260 }
    }

    draw() {
        c.save();
        roundedSet(this.pos.x, this.pos.y, this.width, this.height, 25);
        c.clip();
        c.drawImage(cardImg, this.pos.x, this.pos.y, this.width, this.height);
        const pawnImgSize = this.width * 1
        c.drawImage(this.selectionPawn.pawnImg,
            this.pos.x,
            this.pos.y + this.height / 2 - pawnImgSize / 2,
            pawnImgSize, pawnImgSize);
        c.restore();


        //c.fillStyle = 'purple'
        //c.fillRect(this.pos.x, this.pos.y, this.width, this.height)

        // debug id for deck card piling and refilling 
        c.fillStyle = "rgba(0, 0, 0, 0.5)"
        c.font = "30px Arial"
        c.fillText(DeckCard.list.indexOf(this), // index text
            this.pos.x + this.width / 2,
            this.pos.y + this.height / 2 + 40)
        c.font = "50px Arial"
        c.fillText(this.id, //id text
            this.pos.x + this.width / 2 - 40,
            this.pos.y + this.height / 2)
        
        //Elixir cost of card
        const elixirSize = 40
        const pos = this.pos
        const elixirPos = {
            x: pos.x + this.width / 2 - elixirSize / 2,
            y: pos.y + this.height - elixirSize * 0.8,
        }
        
        c.drawImage(elixirImg, elixirPos.x, elixirPos.y, elixirSize, elixirSize)

        const numpad = this.selectionPawn.elixirCost === 10 ? 20 : 11

        c.font = 'bold 30px sans-serif'
        c.fillStyle = 'white'
        c.textAlign = 'left'
        c.fillText(this.selectionPawn.elixirCost, elixirPos.x + numpad, elixirPos.y + 30)

        c.strokeStyle = 'white'
        c.lineWidth = 2
        c.strokeText(this.selectionPawn.elixirCost, elixirPos.x + numpad, elixirPos.y + 30)
    }

    isHovering() {
        return mouse.x > this.posOrigin.x && mouse.x < this.posOrigin.x + this.width &&
            mouse.y > this.posOrigin.y && mouse.y < this.posOrigin.y + this.height
	}

    onSelection() {
        this.posOffset = DeckCard.selection === this ? { x: 0, y: -40 } : {x: 0, y:0}
            //console.log("hovering deckcard", DeckCard.list.indexOf(this))
        
    }

    update(i) {

        var horSpace = this.width + DeckCard.DECKCARD_PADDING
        var k = 3 - i
        var onDeckPos = {
            x: DeckCard.DECKCARD_STARTPOS.x + horSpace * (k),
            y: DeckCard.DECKCARD_STARTPOS.y,
        }
        this.posOrigin = onDeckPos
        this.onSelection()
        this.pos = {
            x: this.posOrigin.x + this.posOffset.x,
            y: this.posOrigin.y + this.posOffset.y,
        }

        this.draw()
    }

    static drawCards() {
        for (var i = 0; i < 4; i++) {
            var deckCard = DeckCard.list[i]
            deckCard.update(i)
        }
    }

    play(px, py) {
        Client.currentPlayer.playCard(this, {x: px, y: py})

        var index = DeckCard.list.indexOf(this)
        DeckCard.list.splice(index, 1)
        DeckCard.selection = null
    }

    static pileToDeck() {
        var deckCard = new DeckCard()
        deckCard.selectionPawn = Pawn
	}
}
DeckCard.list = []