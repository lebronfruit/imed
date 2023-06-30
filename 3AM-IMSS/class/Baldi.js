const baldiImg = new Image()
baldiImg.src = 'assets/baldi.png'

class Baldi {

    static width = 200;
    static height = 200;

    constructor(transform = { x: 0, y: 0, width: Baldi.width, height: Baldi.height }) {
        this.transform = transform
    }

    draw() {
        ctx.drawImage(baldiImg, this.transform.x, this.transform.y, this.transform.width, this.transform.height)
    }

    update() {
        this.targetpoint = {
            x: playerA.transform.x,
            y: playerA.transform.y,
        }
        this.maxSpd = 5

        let spdX = 0
        let spdY = 0
        
        if (this.targetpoint) {
            const targetpoint = {
                x: this.targetpoint.x ,
                y: this.targetpoint.y ,
            }

            const xDistance = targetpoint.x - this.transform.x
            const yDistance = targetpoint.y - this.transform.y
            const angle = Math.atan2(yDistance, xDistance)
            spdX = Math.cos(angle)
            spdY = Math.sin(angle)

            if (Math.abs(Math.round(this.transform.x) - Math.round(targetpoint.x)) < this.transform.width / 2 &&
                Math.abs(Math.round(this.transform.y) - Math.round(targetpoint.y)) < this.transform.height / 2) {
                this.targetpoint = null
                if (GameState.state === 'playing') {
                    GameState.gameover()
                }
               
            }
        }

        this.transform.x += spdX * this.maxSpd
        this.transform.y += spdY * this.maxSpd

        this.draw()
    }

}