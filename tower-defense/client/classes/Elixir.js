const elixirImg = new Image()
elixirImg.src = 'assets/elixirIcon.png'


class Elixir {

    static width = 530
    static height = 35
    static elixir = 5
    static cooldownAddition = false

    static draw() {
        const pos = {
            x: 230,
            y: canvas.height - Elixir.height - 30,
        }

        //Elixir bar
        c.fillStyle = 'rgba(0, 0, 0, 0.5)'
        c.fillRect(pos.x, pos.y, Elixir.width, Elixir.height)

        c.strokeStyle = 'black'
        c.lineWidth = 5
        c.strokeRect(pos.x, pos.y, Elixir.width, Elixir.height)

        const alpha = Elixir.elixir / 10
        c.fillStyle = 'rgba(200, 0, 100, 1)'
        c.fillRect(pos.x, pos.y, alpha * Elixir.width, Elixir.height)

        c.fillStyle = 'rgba(255, 255, 255, 0.3)'
        c.fillRect(pos.x, pos.y, alpha * Elixir.width, Elixir.height - Elixir.height / 2)

        c.lineWidth = 3
        c.strokeStyle = 'black'
        c.strokeRect(pos.x, pos.y, alpha * Elixir.width, Elixir.height)


        //Elixir status at left side
        const elixirSize = 60
        c.drawImage(elixirImg, pos.x - elixirSize / 2, pos.y + this.height / 2 - elixirSize / 2, elixirSize, elixirSize)

        const numpad = Elixir.elixir === 10 ? 20 : 11

        c.font = 'bold 40px sans-serif'
        c.fillStyle = 'white'
        c.textAlign = 'left'
        c.fillText(Elixir.elixir, pos.x - numpad, pos.y + 30)

        c.strokeStyle = 'white'
        c.lineWidth = 2
        c.strokeText(Elixir.elixir, pos.x - numpad, pos.y + 30)
    }

    static addElixir(amount) {
        Elixir.elixir = clamp(Elixir.elixir + amount, 0, 10)
    }

    static decreaseElixir(amount) {
        Elixir.elixir = clamp(Elixir.elixir - amount, 0, 10)
    }

    static update() {
        Elixir.draw()

        if (Elixir.cooldownAddition == false) {
            Elixir.cooldownAddition = true
            setTimeout(() => {
                Elixir.cooldownAddition = false
                Elixir.addElixir(1)

            }, 1000 / 10)
        }
    }

}