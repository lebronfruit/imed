class Dialogue {

    static currentText = ''
    static twIndex = 0

    static draw() {
        ctx.fillStyle = 'white'
        ctx.fillRect(0, canvas.height-200, canvas.width, 200, 0)
        ctx.drawImage(playerImg, -250, canvas.height - 400, 800, 800)

        ctx.fillStyle = 'black'
        ctx.font = '40px sans-serif'

        let wrappedText = wrapText(ctx, Dialogue.currentText, 350, canvas.height - 120, 500, 35);
        // wrappedTe
        wrappedText.forEach(function (item) {
            // item[0] is the text
            // item[1] is the x coordinate to fill the text at
            // item[2] is the y coordinate to fill the text at
            ctx.fillText(item[0], item[1], item[2]);
        })

    }

    static typewrite(text) {
        Dialogue.currentText = Dialogue.currentText + text.charAt(Dialogue.twIndex)
    }

    static update() {
        Dialogue.draw()
    }

    static read(text, nextEvent) {
        Dialogue.currentText = ''
        Dialogue.twIndex = 0

        function doTypewrite() {
            Dialogue.typewrite(text)
            Dialogue.twIndex++
            if (Dialogue.twIndex < text.length) {
                setTimeout(() => {
                    doTypewrite()
                }, 1000 * 0.03)
            }
            
        }
        doTypewrite()
        

        setTimeout(() => {
            nextEvent()
        }, 1000 * 3)
    }

}