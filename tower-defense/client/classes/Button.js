function roundedSet(x, y, width, height, radius) {
    c.beginPath();
    c.moveTo(x + radius, y);
    c.lineTo(x + width - radius, y);
    c.quadraticCurveTo(x + width, y, x + width, y + radius);
    c.lineTo(x + width, y + height - radius);
    c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    c.lineTo(x + radius, y + height);
    c.quadraticCurveTo(x, y + height, x, y + height - radius);
    c.lineTo(x, y + radius);
    c.quadraticCurveTo(x, y, x + radius, y);
    c.closePath();
}
const colorBlueSelection = 'rgb(128, 215, 255)'
const colorKingYellow = 'rgb(255, 179, 0)'
const colorBlueUser = 'rgb(20, 157, 255)'
const colorRedUser = 'rgb(255, 43, 43)'
class Button {

    static list = []

    constructor({ pos = { x: 0, y: 0 }, width = 100, height = 50, color = 'white', anchor = 'left',
        text = 'Sample Text', textSize = '50px', roundCorner = 25}, CLICKEVENT) {
        this.pos = pos
        this.posOrigin = pos
        this.width = width
        this.height = height
        this.clickEvent = CLICKEVENT
        this.color = color
        this.buttonText = text
        this.anchor = anchor
        this.textSize = textSize
        this.roundCorner = roundCorner
        this.activeHover = false
        Button.list.push(this)
    }

    trackPosition(pos) {
        this.posOrigin = pos
        this.pos = pos
        const center = {
            x: pos.x - this.width / 2,
            y: pos.y - this.height / 2,
        }
        this.pos = {
            x: this.anchor == 'left' ? this.posOrigin.x : center.x,
            y: this.anchor == 'left' ? this.posOrigin.y : center.y,
        }
    }

    isHovering() {
        this.activeHover = mouse.x > this.pos.x && mouse.x < this.pos.x + this.width &&
            mouse.y > this.pos.y && mouse.y < this.pos.y + this.height
        return this.activeHover
    }

    getCenter() {
        return {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2,
        }
    }

    onClick() {
        this.clickEvent()
    }


    draw() {
        c.save();
        roundedSet(this.pos.x, this.pos.y, this.width, this.height, this.roundCorner);
        c.clip();
        c.fillStyle = this.activeHover == false ? this.color : colorBlueSelection
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        c.restore();


        

        c.fillStyle = "white"
        c.textAlign = "center"
        const center = this.getCenter()
        c.font = 'Bold ' + this.textSize + ' Arial'
        c.fillText(this.buttonText,
            center.x,
            center.y + 15
        )
        c.textAlign = "left"
    }

    update() {
        this.draw()
    }
}