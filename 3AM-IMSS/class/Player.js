class Player {

    static list = []
    static width = 200
    static height = 200

    constructor(id, transform = { x: 0, y: 0, width: Player.width, height: Player.height }) {
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
        this.transform.x += this.getSpeed().x * this.maxSpd
        this.transform.y += this.getSpeed().y * this.maxSpd
    }

    static updatePlayers() {
        Player.list.forEach(player => {
            player.update()
            player.draw()
        })
    }

}