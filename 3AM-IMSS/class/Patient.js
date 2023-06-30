const bedImg = new Image()
bedImg.src = 'assets/bed.png'

const patientImgs = []
function addPatientImg(directory) {
    let img = new Image()
    img.src = directory
    patientImgs.push(img)
}
addPatientImg('assets/patient1.png')

class Bed {
    static width = 320
    static height = 320
}

class Patient {

    static list = []
    static width = 200
    static height = 200
    

    constructor(transform = { x: 0, y: 0 }) {
        this.transform = transform
        this.width = Patient.width
        this.height = Patient.height
        Patient.list.push(this)
    }

    draw() {
        ctx.drawImage(bedImg, this.transform.x - 90, this.transform.y - 40, Bed.width, Bed.height)
        ctx.drawImage(patientImgs[0], this.transform.x, this.transform.y, this.width, this.height)
    }

    update() {
        this.draw()
    }

    static updatePatients() {
        Patient.list.forEach(patient => {
            patient.update()
            
        })
    }
}