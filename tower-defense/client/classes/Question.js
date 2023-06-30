class Question {

    static list = []

    constructor(caption, answers) {
        this.caption = caption
        this.answers = answers
        Question.list.push(this)
    }

}
new Question('GPCR de la biosenalizacion de la vision...',
    ['Transducina', 'Rh', 'INSR', 'B-AR']
)