const pawnImg = new Image()
pawnImg.src = 'assets/skeleton.png'

const pawnGlowImg = new Image()
pawnGlowImg.src = 'assets/skeletonGlow.png'

class Pawn {

    static list = []
    static width = 50
    static height = 50
    static elixirCost = 3
    static TRIGGERANGE = 200
    static pawnImg = pawnImg

    constructor({ pos = { x: 0, y: 0 } }) {
        this.pos = pos
        this.width = Pawn.width
        this.height = Pawn.height
        
        this.setCenter()
        this.pos = {
            x: this.pos.x - this.width / 2,
            y: this.pos.y - this.height / 2
        }
        this.waypoint = undefined
        this.waypoints = undefined
        this.waypointIndex = undefined
        this.setWaypoints()
        this.followWaypoints()

        Pawn.list.push(this)
        Quiz.clickablePawns.push(this)

        this.healthbar = new Healthbar({
            pos: { x: 0, y: 0 }, color: this.color,
            health: 400, scoreHidden: true
        })
        this.healthbar.entity = this
        this.targetpoint = null
        this.targetEntity = null
        this.TRIGGERANGE = Pawn.TRIGGERANGE
        this.targetClosestDistance = this.TRIGGERANGE

        this.elixirCost = Pawn.elixirCost
        this.attackCooldown = false
        this.player = undefined
        this.destroyed = false
    }

    draw() {
        //c.fillStyle = 'blue'
       // c.fillRect(this.pos.x, this.pos.y, this.width, this.height)

        const pos = this.player.getScreenPos(this.pos.x, this.pos.y, this.width, this.height)
        c.drawImage(pawnImg, pos.x, pos.y, this.width, this.height)
    }

    static drawGlowRange(x, y) {
        var x = x + 32 
        var y = y + 32
        var rx = x,
            ry = y,
            // Radii of the white glow.

            // Radius of the entire circle.
            radius = Pawn.TRIGGERANGE;

        var outerRadius = radius
        var innerRadius = radius - outerRadius

        c.beginPath()
        var gradient = c.createRadialGradient(rx, ry, innerRadius, rx, ry, outerRadius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0)');
        gradient.addColorStop(0.985, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(0.985, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');


        c.arc(x, y, radius, 0, 2 * Math.PI);
        c.fillStyle = gradient;
        c.fill();
    }

    static drawGlow(x, y) {
        const placementSpace = {
            x: 1 * 64,
            y: 1 * 64
        }

        c.beginPath();
        c.roundRect(x, y, placementSpace.x, placementSpace.y, [20]);
        c.fillStyle = "rgba(50, 150, 255, 0.6)"
        c.fill()
        c.strokeStyle = "white";
        c.lineWidth = 5
        c.stroke();
        
        

        c.drawImage(pawnGlowImg, x + 32 - this.width/2, y + 32 - this.height/2 - this.height * 0.4, this.width, this.height)

        c.font = 'bold 30px sans-serif'
        c.fillStyle = 'white'
        c.textAlign = 'center'
        c.fillText('Pawn', x+ 32, y + 32 - 60)
        c.textAlign = 'left'
    }

    isQuizHoverable() {
        const clickRange = 50
        return mouse.x > this.pos.x - clickRange
            && mouse.x < this.pos.x + this.width + clickRange
            && mouse.y > this.pos.y - clickRange
            && mouse.y < this.pos.y + this.height + clickRange
    }

    getCenter() {
        return {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2,
        }
    }

    setCenter() {
        this.center = this.getCenter()
    }


    setWaypoints() {
        const leftLane = Waypoint.LeftLane.waypoints
        const rightLane = Waypoint.RightLane.waypoints
        const pathway = (this.pos.x < canvas.width / 2) ? leftLane : rightLane
        console.log(pathway === leftLane ? "leftLane" : "rightLane")
        this.pathway = pathway
        this.waypoints = pathway
    }

    followWaypoints() {
        const pathway = this.waypoints
        var closestDistance = Infinity
        var selectionIndex = undefined
        for (var i = 0; i < pathway.length; i++) {
            var point = pathway[i]
            var distance = getDistance(this.getCenter(), point)
            //console.log("for i", i, "distance:", distance, ", closestDistance:", closestDistance)
            if (distance < closestDistance) {
                closestDistance = distance
                selectionIndex = i
            }
        }
        this.waypointIndex = selectionIndex
        this.waypoint = this.waypoints[this.waypointIndex]
    }

    finishedWaypoint() {
        const distance = getDistance(this.getCenter(), this.waypoint)

        /*
        c.strokeStyle = 'rgb(100, 255, 100)';
        c.lineWidth = 5;
        c.beginPath();
        c.moveTo(this.getCenter().x, this.getCenter().y);
        c.lineTo(this.waypoint.x, this.waypoint.y);
        c.stroke();
        */
        return (Math.floor(distance) <= 0)
    }

    nextWaypoint() {
        this.waypointIndex += 1
        this.waypoint = this.waypoints[this.waypointIndex]
    }

    update() {
        if (this.targetEntity && this.targetEntity.healthbar.health <= 0) {
            this.targetEntity = null
            this.targetClosestDistance = this.TRIGGERANGE
        }

        if (!this.targetEntity) {
            for (var i = 0; i < this.player.EnemyService.towerList.length; i++) {
                //console.log("reading enemies")
                const enemy = this.player.EnemyService.towerList[i]
                const enemyCenter = enemy.player.getScreenPos(enemy.getCenter().x, enemy.getCenter().y, 0, 0)
                const center = this.player.getScreenPos(this.getCenter().x, this.getCenter().y, 0, 0)
                var distance = getDistance(center, enemyCenter)
                if (distance < this.targetClosestDistance) {
                    this.targetEntity = enemy
                    this.targetClosestDistance = distance
                    this.targetpoint = this.player.getScreenPos(enemyCenter.x, enemyCenter.y, 0, 0)

                    //console.log('pawn.', this.player === Player.A ? 'A' : 'B', 'attacking tower', enemy.player === Player.A ? 'A' : 'B' )
                }
            }
        }
            //this.targetEntity = null
        if (this.targetEntity) {
            //this.targetEntity.drawHitBounds(this)
            this.waypoint = null
            //console.log("last was targetentity")
        }
        else {
            if (!this.waypoint) { //fired after taget's death
                this.followWaypoints()
            }
            //console.log("waypiontindex", this.waypointIndex)
            if (this.waypointIndex < this.waypoints.length -1
                && this.finishedWaypoint()) {
                this.nextWaypoint()
                
            }
           
            
            this.targetpoint = this.waypoint
            //c.fillStyle = 'yellow'
            //c.fillRect(this.targetpoint.x, this.targetpoint.y, 64, 64)
           // console.log("last was waypoint")
        }

        const center = this.getCenter()
        //console.log('targetpoint =', this.targetpoint)
        const yDistance = this.targetpoint.y - center.y
        const xDistance = this.targetpoint.x - center.x
        const angle = Math.atan2(yDistance, xDistance)
        this.pos.x += Math.cos(angle)
        this.pos.y += Math.sin(angle)
       

        if (this.targetpoint === this.waypoint) {
            if (Math.round(center.x) === Math.round(this.targetpoint.x) &&
                Math.round(center.y) === Math.round(this.targetpoint.y) &&
                this.waypointIndex < this.waypoints.length - 1) {
                this.waypointIndex++;
            }
        }
        if (this.targetEntity && !this.targetEntity.inHitRange(this) ) {
            //console.log("pawn.", this.player.nickname, " yet not in hit range")
        }
        if (this.attackCooldown == false &&
            this.targetEntity && this.targetEntity.inHitRange(this)) {
            this.attackCooldown = true
            this.targetEntity.healthbar.damage(550)
            //console.log("firing attack heealth:", this.targetEntity.healthbar.health)

            setTimeout(() => {
                this.attackCooldown = false
            }, 1000*1)
        }
        
        this.draw()
        this.healthbar.trackPosition(this)
        this.healthbar.color = this.player.isCurrentPlayer() ? 'blue' : 'red'
        this.healthbar.update()
        if (this.healthbar.health <= 0) { 
            this.destroy()
            console.log("destroying pawn")
        }
    }

    destroy() {
        var index = Pawn.list.indexOf(this)
        Pawn.list.splice(index, 1)

        var index = Quiz.clickablePawns.indexOf(this)
        Quiz.clickablePawns.splice(index, 1)

        this.destroyed = true
        this.player.removePawn(this)
        this.player.EnemyService.destroy(this)
    }


}

//Pawn.list.pop()