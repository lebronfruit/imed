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

const hfdownImg = new Image()
hfdownImg.src = 'assets/handfingerdown.png'



const vitalsImg = new Image()
vitalsImg.src = 'assets/arterialPressure.png'



class Patient {

    static list = []
    static width = 200
    static height = 200
    

    constructor(transform = { x: 0, y: 0 }) {
        this.action = {
            bloodpressure: false,
        }
        this.needs = {
            bloodpressure: false,
            bloodpressureStart: undefined,
        }
        this.prompt = {
            vitals: false,
        }

        this.hfstartTime = undefined
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

    updateActions() {
        if (playerA.selection.bloodpressure === this) {
            this.promptVitals()
        }
        else {
            this.prompt.vitals = false
        }

        if (this.needs.bloodpressure === true && playerA.selection.bloodpressure != this) {
            this.promptMark()
        }

        let endtime = new Date().getTime()
        
        if (this.needs.bloodpressure === false && this.needs.bloodpressureStart === undefined) {
            
            this.needs.bloodpressureStart = new Date().getTime()

            setTimeout(() => {
                this.needs.bloodpressure = true
                this.needs.bloodpressureStart = undefined
            }, 10000 * Math.random(10, 20))
        }
    }

    static updateActions() {
        Patient.list.forEach(patient => {
            patient.updateActions()
        })
    }

    promptMark() {
        if (this.hfstartTime === undefined) {
            this.hfstartTime = new Date().getTime()
        }

        const endtime = new Date().getTime()
        const elapsedTime = endtime - this.hfstartTime
        const elapsedAlpha = clamp(elapsedTime / 1000, 0, 1)
        //console.log(elapsedTime)
        if (elapsedAlpha >= 1) {
            this.hfstartTime = new Date().getTime()
        }
        const distance = 50
        let alpha = clamp(elapsedAlpha, 0, 0.5) + 0.5 - clamp(elapsedAlpha - 0.5, 0, 0.5)
        alpha = alpha ** 2
        ctx.drawImage(hfdownImg, this.transform.x + 40, this.transform.y + distance * alpha, 60, 60)
    }

    promptVitals() {
        if (this.prompt.vitals === false) {
            this.prompt.vitals = true
            promptAudio.play()
        }

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.beginPath()
        ctx.roundRect(this.transform.x - 50, this.transform.y - 50, 250, 50, [5])
        ctx.fill()
        ctx.lineWidth = 3
        ctx.strokeStyle = 'white'
        ctx.stroke()

       
        
        ctx.drawImage(vitalsImg, this.transform.x - 50 + 5, this.transform.y + 5 - 50, 40, 40)

        ctx.font = '30px sans-serif'
        ctx.fillStyle = 'white'
        ctx.fillText('revisar vitales', this.transform.x - 50 + 50 + 5, this.transform.y - 50 + 35)

        
    }
}