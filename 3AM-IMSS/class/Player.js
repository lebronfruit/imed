class Player {

    static targetPos = null
    static list = []
    static width = 200
    static height = 200

    constructor(id, transform = { x: 0, y: 0, width: Player.width, height: Player.height }) {
        this.targetpoint = null
        this.id = id
        this.transform = transform
        this.moveDirection = {
            forward: 0,
            backward: 0,
            left: 0,
            right: 0,
        }
        this.spdX = 0
        this.spdY = 0
        this.maxSpd = 4
        Player.list.push(this)
    }

    draw() {

        ctx.drawImage(playerImg, this.transform.x, this.transform.y, this.transform.width, this.transform.height)
    }

    move(context, m) {
        if (context === 'forward') {
            this.moveDirection.forward = m
        }
        else if (context == 'backward') {
            this.moveDirection.backward = m
        }
        else if (context === 'left') {
            this.moveDirection.left = m
        }
        else if (context === 'right') {
            this.moveDirection.right = m
        }
    }

    getSpeed() {
        return {
            x: -this.moveDirection.left + this.moveDirection.right,
            y: -this.moveDirection.forward + this.moveDirection.backward,

        }
    }

    update() {
        let spdX = 0
        let spdY = 0
       
            spdX = this.getSpeed().x
            spdY = this.getSpeed().y
   
        if (this.targetpoint) {
            const targetpoint = {
                x: this.targetpoint.x - this.transform.width / 2,
                y: this.targetpoint.y - this.transform.height / 2,
            }

            const xDistance = targetpoint.x - this.transform.x
            const yDistance = targetpoint.y - this.transform.y
            const angle = Math.atan2(yDistance, xDistance)
            spdX = Math.cos(angle)
            spdY = Math.sin(angle)

            if (Math.abs(Math.round(this.transform.x) - Math.round(targetpoint.x)) < 3 &&
                Math.abs(Math.round(this.transform.y) - Math.round(targetpoint.y)) < 3) {
                this.targetpoint = null
            }
        }

        this.transform.x += spdX * this.maxSpd
        this.transform.y += spdY * this.maxSpd
    }
        

    static updatePlayers() {
        Player.list.forEach(player => {
            player.update()
            player.draw()
        })
    }

}