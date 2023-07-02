const baldiImg = new Image()
baldiImg.src = 'assets/baldi.png'

const baldiJumpscareImg = new Image()
baldiJumpscareImg.src = 'assets/baldiJumpscare.png'

const baldiJumpscareAudio = new Audio('assets/baldiJumpscare.mp3');
const runningFootstepsAudio = new Audio('assets/runningFootsteps.mp3');

class Baldi {

    static jumpscareActive = false
    static killedYou = false
    static width = 200;
    static height = 200;

    constructor(transform = { x: 0, y: 0, width: Baldi.width, height: Baldi.height }) {
        this.playingFootsteps = false
        this.transform = transform
    }

    draw() {
        ctx.drawImage(baldiImg, this.transform.x, this.transform.y, this.transform.width, this.transform.height)
    }

    move() {
        if (this.playingFootsteps === false && firstWindowClick === true) {
            this.playingFootsteps = true
            runningFootstepsAudio.play()
        }


        this.targetpoint = {
            x: playerA.transform.x,
            y: playerA.transform.y,
        }
        this.maxSpd = 20

        let spdX = 0
        let spdY = 0

        if (this.targetpoint) {
            const targetpoint = {
                x: this.targetpoint.x,
                y: this.targetpoint.y,
            }

            const xDistance = targetpoint.x - this.transform.x
            const yDistance = targetpoint.y - this.transform.y
            const angle = Math.atan2(yDistance, xDistance)
            spdX = Math.cos(angle)
            spdY = Math.sin(angle)

            
        }

        this.transform.x += spdX * this.maxSpd
        this.transform.y += spdY * this.maxSpd
    }

    update() {
        if (this.playingFootsteps === false && runningFootstepsAudio.paused === false) {
            setTimeout(() => {
                runningFootstepsAudio.pause()
            }, 1000 * 0.5)
            
        }

        if (this.targetpoint) {
            const targetpoint = this.targetpoint
            if (Math.abs(Math.round(this.transform.x) - Math.round(targetpoint.x)) < this.transform.width / 2 &&
                Math.abs(Math.round(this.transform.y) - Math.round(targetpoint.y)) < this.transform.height / 2) {
                this.targetpoint = null
                if (GameState.state === 'playing') {

                    hospitalSound.pause()
                    baldiJumpscareAudio.play()
                    Baldi.killedYou = true
                    Baldi.jumpscareActive = true

                    setTimeout(() => {
                        Baldi.jumpscareActive = false
                        GameState.gameover()
                    }, 1000 * 3)
                }

            }
        }
        


        
    }

    baldiKilledYou() {
        runningFootstepsAudio.pause()
        bpAudio.pause()
        taskCompleteAudio.pause()

        ctx.fillStyle = 'rgba(0, 0, 0, 1)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const size = 1200
        ctx.drawImage(baldiJumpscareImg, canvas.width / 2 - size / 2, canvas.height / 2 - size / 2, size, size)
    }

}