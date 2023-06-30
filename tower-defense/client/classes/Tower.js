class Projectile {

    static list = []

    constructor({ pos = { x: 0, y: 0 } }, target, hitevent) {
        this.pos = pos
        this.radius = 4
        this.target = target
        this.hitevent = hitevent

        Projectile.list.push(this)
    }

    getCenter() {
        return {
            x: this.pos.x - this.radius,
            y: this.pos.y - this.radius
        }
    }

    draw() {
        
        c.fillStyle = 'rgba(20, 20, 20, 1)'
        c.beginPath();
        const center = this.player.getScreenPos(this.getCenter().x, this.getCenter().y, 0, 0)
        c.arc(center.x, center.y, this.radius * 2, 0, 2 * Math.PI);
        c.fill()
        /*c.fillStyle = 'gray'
        c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        console.log("drawing projectile")*/
    }
    update() {
        const spd = 20;
        const targetCenter = this.target.player.getScreenPos(this.target.getCenter().x, this.target.getCenter().y, 0, 0)
        const pos = this.player.getScreenPos(this.pos.x, this.pos.y, 0, 0)

        if (Debug.active) {
            c.fillStyle = 'blue'
            c.fillRect(pos.x, pos.y, 20, 20)

            // Start a new Path
            c.strokeStyle = 'rgb(255, 0, 0)'
            c.beginPath();
            c.moveTo(pos.x, pos.y)
            c.lineTo(targetCenter.x, targetCenter.y)

            // Draw the Path
            c.stroke();
        }
        
        const deltaposRaw = {
            x: targetCenter.x - pos.x,
            y: targetCenter.y - pos.y
        }

        //important line of code right here, fixing.y substraction order
        const deltaPosition = {
            x: deltaposRaw.x,
            y: this.player.isCurrentPlayer() ? deltaposRaw.y : pos.y - targetCenter.y
        }
        //console.log("updating projectile")
        const angle = Math.atan2(deltaPosition.y, deltaPosition.x)
        this.pos.x += Math.cos(angle) * spd
        this.pos.y += Math.sin(angle) * spd

        this.draw()

        const distance = getDistance(pos, targetCenter)
        //console.log('Projectile pos:', pos, ', targetCenter:', targetCenter)
        //console.log('Projectile.', this.player.nickname, 'distance =', distance)
        if (Math.floor(distance) <= 4 && true) {
            this.hitevent()
            this.destroy()
        }
    }

    destroy() {
        const index = Projectile.list.indexOf(this)
        Projectile.list.splice(index, 1)
    }

    static updateProjectiles() {
        for (var i = 0; i < Projectile.list.length; i++) {
            const projectile = Projectile.list[i]
            projectile.update()
        }
    }
}

const towerAImg = new Image()
towerAImg.src = 'assets/lowerKingTower.png'

const towerBImg = new Image()
towerBImg.src = 'assets/kingTower.png'

function getClosestTarget(entityA, list, range) {
    var closestTarget = null
    var closestDistance = range

    for (var i = 0; i < list.length; i++) {
        const target = list[i]
        const targetCenter = target.player.getScreenPos(target.getCenter().x, target.getCenter().y, 0, 0)
        const entityCenter = entityA.player.getScreenPos(entityA.getCenter().x, entityA.getCenter().y, 0, 0)

        if (Debug.active && target.player == Client.currentPlayer) {
            // Start a new Path
            c.strokeStyle = 'rgb(100, 255, 100)'
            c.beginPath();
            c.moveTo(entityCenter.x, entityCenter.y)
            c.lineTo(targetCenter.x, targetCenter.y)

            // Draw the Path
            c.stroke();
        }
        const distance = getDistance(entityCenter, targetCenter)
        if (distance < closestDistance) {
            closestDistance = distance
            closestTarget = target
        }
    }

    return closestTarget
}


class Tower {

    static list = []
    static width = 100 
    static height = 100
    static SHOOTINGRANGE = 240

    constructor({ pos = { x: 0, y: 0 }, color = 'blue'}) {
        this.pos = pos
        this.width = Tower.width
        this.height = Tower.height
        this.moveToOwnCenter()
        this.color = color

        this.addHealthbar(3052)
        this.player = undefined
        this.SHOOTINGRANGE = Tower.SHOOTINGRANGE
        this.shootCooldown = false
        this.shootTarget = null

        Tower.list.push(this)
    }

    addHealthbar(health) {
        this.healthbar = new Healthbar({ pos: { x: 0, y: 0 }, color: this.color, health })
        this.healthbar.entity = this
        //this.healthbar.trackPosition(this)
    }

    moveToOwnCenter() {
        this.pos = {
            x: this.pos.x - this.width / 2,
            y: this.pos.y - this.height / 2,
        }
    }

    getCenter() {
        return {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2,
        }
    }

    draw() {
        //c.fillStyle = this.color
        //c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
        const towerImg = this.player === Player.A ? towerAImg : towerBImg
        const pos = this.player.getScreenPos(this.pos.x, this.pos.y, this.width, this.height)
        c.drawImage(towerImg, pos.x, pos.y, this.width, this.height)
    }

    update() {
        this.draw()
        this.healthbar.trackPosition(this)
        this.healthbar.color = this.player.isCurrentPlayer() ? 'blue' : 'red'
        this.healthbar.update()
        if (this.healthbar.health <= 0) {
            console.log("destroying tower")
            this.destroy()
        } 

        if (this.shootCooldown == false) {

            this.shootTarget = this.shootTarget && this.shootTarget.destroyed == false ? this.shootTarget : getClosestTarget(this, this.player.EnemyService.pawnList, this.SHOOTINGRANGE)
            if (this.shootTarget) {
                // console.log(this.player.nickname, ".tower shooting:", this.shootTarget, 'from ', this.shootTarget.player.nickname)
                this.shootCooldown = true
                    
                setTimeout(() => {
                    this.shootCooldown = false
                }, 1000)

                const projectile = new Projectile({ pos: this.getCenter() }, this.shootTarget, () => {
                    this.shootTarget.healthbar.damage(100)
                })
                //console.log("Projectile created by", this.player.nickname, "firing at pawn from", this.shootTarget.player.nickname)
                projectile.player = this.player
                
            }
        }
    }

    inRange(entity, range) {
        const distance = getDistance(entity.getCenter(), this.getCenter())
        return distance < range ? distance : null
    }

    getHitBounds(entity) {
        const minX = this.pos.x - (TRIGGER_RANGE_SPAN + entity.width / 2)
        const maxX = this.pos.x + this.width + (TRIGGER_RANGE_SPAN + entity.width / 2)
        const minY = this.pos.y - (TRIGGER_RANGE_SPAN + entity.height / 2)
        const maxY = this.pos.y + this.height + (TRIGGER_RANGE_SPAN + entity.height / 2)

        return [minX, maxX, minY, maxY]
        
    }

    drawHitBounds(entity) {
        const [minX, maxX, minY, maxY] = this.getHitBounds(entity)
        const size = { x: maxX - minX, y: maxY - minY }
        const min = this.player.getScreenPos(minX, minY, size.x, size.y)

        c.fillStyle = 'rgba(255, 50, 255, 0.4)'
        c.fillRect(min.x, min.y, size.x, size.y)
    }

    inHitRange(entity) {
        const [minX, maxX, minY, maxY] = this.getHitBounds(entity) 
        const size = { x: maxX - minX, y: maxY - minY }
        const minraw = this.player.getScreenPos(minX, minY, 0, 0)
        const maxraw = this.player.getScreenPos(maxX, maxY, 0, 0)
        const min = {
            x: Math.min(minraw.x, maxraw.x),
            y: Math.min(minraw.y, maxraw.y),
        }
        const max = {
            x: Math.max(minraw.x, maxraw.x),
            y: Math.max(minraw.y, maxraw.y),
        }

        if (Debug.active) {
            c.fillStyle = 'rgba(255, 100, 100, 0.3)'
            c.fillRect(min.x, min.y, size.x, size.y)
        }
       

        const entityCenter = entity.player.getScreenPos(entity.getCenter().x, entity.getCenter().y, 0, 0)

        if (Debug.active && false) {
            // Start a new Path
            c.strokeStyle = 'rgb(100, 255, 100)'
            c.beginPath();
            c.moveTo(min.x + size.y / 2, min.y + size.y / 2);
            c.lineTo(entityCenter.x, entityCenter.y);

            // Draw the Path
            c.stroke();

            //console.log(entity.player.nickname, "accessing for tower:", this.player.nickname, "min:", min, ", max:", max)
        }
        return (entityCenter.x >= min.x
            && entityCenter.x <= max.x
            && entityCenter.y >= min.y
            && entityCenter.y <= max.y)
    }

    destroy() {
        var index = Tower.list.indexOf(this)
        Tower.list.splice(index, 1)

        this.player.EnemyService.destroy(this)
        console.log("destroyed tower")
    }

    static updateTowers() {
        for (var i = 0; i < Tower.list.length; i++) {
            const tower = Tower.list[i]
            tower.update()
        }
    }
}

class KingTower extends Tower {
    static width = 150
    static height = 150

    constructor({ pos = { x: 0, y: 0 }, color = 'blue' }) {
        super(pos, color)
        this.pos = pos
        this.width = KingTower.width
        this.height = KingTower.height
        this.moveToOwnCenter()
        this.color = color

        this.SHOOTINGRANGE = 310
        this.addHealthbar(8064)
        Tower.list.push(this)

        
    }

    destroy() {
        super.destroy()
        Match.state = 'Game Over'
    }

}