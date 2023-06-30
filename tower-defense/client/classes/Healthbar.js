const MINWIDTH = 50
const MAXWIDTH = 200
const DELTAWIDTH = MAXWIDTH-MINWIDTH
const MINHEALTH = 200
const MAXHEALTH = 8000
const DELTAHEALTH = MAXHEALTH-MINHEALTH




class Healthbar {
    static width = 140
    static height = 12

    constructor({ pos = { x: 0, y: 0 }, color = 'blue', health = 3000, scoreHidden = false}) {
        this.pos = pos
        this.health = health
        this.healthOrigin = health
        this.scoreHidden = scoreHidden

        var width = MINWIDTH
        const deltaHealth = this.health - MINHEALTH
        const alpha = deltaHealth / DELTAHEALTH
        if (this.health < MINHEALTH) {
            width = MINWIDTH
        }
        else if (this.health > MAXHEALTH) {
            width = MAXWIDTH
        }
        else {
            width = MINWIDTH + alpha * DELTAWIDTH
        }

        this.width = width
        this.height = Healthbar.height
       
        this.moveToOwnCenter()
        this.color = color
    }

    moveToOwnCenter() {
        this.pos = {
            x: this.pos.x - this.width / 2,
            y: this.pos.y - this.height / 2,
        }
    }

    trackPosition(entity) {
        const aboveEntityPos = {
            x: entity.pos.x,
            y: entity.pos.y,
        }
        this.pos = aboveEntityPos //pos is a drawingi pos so it don't matter to not be locally oriented
        //this.moveToOwnCenter()
	}

    draw() {
        const alpha = this.health / this.healthOrigin
        c.fillStyle = this.color
        const pos = this.entity.player.getScreenPos(this.pos.x, this.pos.y, this.entity.width, this.entity.height)
        
        pos.y -= 20
        c.fillRect(pos.x, pos.y, alpha * this.width, this.height)

        if (this.scoreHidden == 1) {
            c.fillStyle = "rgb(255, 255, 255)"
            c.font = "bold 30px Arial"
            c.fillText(this.health, // index text
                pos.x + this.width * 0.2,
                pos.y + this.height / 2 - 18)
        }
    }

    update() {
        if (this.health < this.healthOrigin) {
            this.draw()
        }
        
    }

    damage(amount) {
        this.health = clamp(this.health-amount, 0, Infinity)
	}
}