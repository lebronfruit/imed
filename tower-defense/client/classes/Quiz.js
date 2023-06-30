
class Quiz {

    static clickablePawns = []
    static list = []
    static current = null

    constructor(clue) {
        this.pos = undefined
        this.width = 550
        this.height = this.width
        this.clue = clue
    }

    draw() { //console.log("drawing reect")
        this.pos = {
            x: canvas.width/2 - this.width / 2,
            y: canvas.height/2 - this.height / 2,
        }


        c.beginPath();
        c.roundRect(this.pos.x, this.pos.y, this.width, this.height, [25]);
        c.fillStyle = "rgba(255, 255, 255, 0.7)"
        c.fill()
        c.strokeStyle = "white";
        c.lineWidth = 8
        c.stroke();


        c.font = 'bold 40px sans-serif'
        c.fillStyle = 'black'
        c.textAlign = 'center'
        let wrappedText = wrapText(c, this.clue.caption, this.pos.x + this.width / 2, this.pos.y + 50, this.width, 35);
        // wrappedTe
        wrappedText.forEach(function (item) {
            // item[0] is the text
            // item[1] is the x coordinate to fill the text at
            // item[2] is the y coordinate to fill the text at
            c.fillText(item[0], item[1], item[2]);
        })

        c.textAlign = 'left'

        for (let i = 0; i < this.clue.answers.length; i++) {
            const answer = this.clue.answers[i]

            const answerTransform = {
                x: this.pos.x,
                y: this.pos.y + 240,
                width: 400, 
                height: 40,
            }
            answerTransform.x += (this.width - answerTransform.width)/2
            answerTransform.y += (i - 1) * (answerTransform.height + 20)
            c.beginPath();
            c.roundRect(answerTransform.x, answerTransform.y, answerTransform.width, answerTransform.height, [25]);
            c.fillStyle = "rgba(255, 255, 255, 0.8)"
            c.fill()
            c.strokeStyle = "white";
            c.lineWidth = 5
            c.stroke();

            c.font = 'bold 40px sans-serif'
            c.fillStyle = 'black'
            c.textAlign = 'center'
            let wrappedText = wrapText(c, answer,
                answerTransform.x + answerTransform.width / 2,
                answerTransform.y + answerTransform.height * 0.8, answerTransform.width,
                answerTransform.height / 2, 35);
            // wrappedTe
            wrappedText.forEach(function (item) {
                // item[0] is the text
                // item[1] is the x coordinate to fill the text at
                // item[2] is the y coordinate to fill the text at
                c.fillText(item[0], item[1], item[2]);
            })
        }
        
    }

    answerCorrectly() {
        var index = Quiz.list.indexOf(this)
        Quiz.list.splice(index, 1)
        Quiz.current = null
        //Elixir.addElixir(3)
    }

    update() {
        this.draw()
    }

    static clickAQuiz() {
        if (Quiz.current) {
            Quiz.current.answerCorrectly()
        }
        else {
            for (var i = 0; i < Quiz.clickablePawns.length; i++) {
                const clickable = Quiz.clickablePawns[i]
                if (clickable.isQuizHoverable()) {
                    Quiz.current = new Quiz(Question.list[0])
                    break
                }
            }
        }
    }

    static updateQuizzes() {
        if (Quiz.current) {
            Quiz.current.update()
        }
    }
}