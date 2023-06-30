class Player {

    static list = []
    static A = undefined
    static B = undefined

    constructor(nickname) {
        this.nickname = nickname
        this.pawns = []
        this.towers = []
        this.orientation = 180
        this.EnemyService = new EnemyService(this)
        Player.list.push(this)
    }

    setMyOwnership(...entities) {
        entities.forEach(entity => {
            entity.player = this
        })
    }

    setAsMyPawn(pawn) {
        this.setMyOwnership(pawn)
        pawn.player = this
        this.EnemyService.identify(pawn)
        this.pawns.push(pawn)
    }

    setAsMyTower(tower) {
        this.setMyOwnership(tower)
        tower.player = this
        this.EnemyService.identify(tower)
        this.towers.push(tower)
    }

    removePawn(pawnToRemove) {
        const index = this.pawns.indexOf(pawnToRemove)
        this.pawns.splice(index, 1)
    }

    static drawNickNameB() {
        const pos = {
            x: 70,
            y: 60,
        }


        c.fillStyle = 'white'
        c.textAlign = 'left'
        c.font = 'bold 30px sans-serif'
        c.fillText(Player.B.nickname, pos.x + 50, pos.y)

        c.fillStyle = colorRedUser
        c.fillRect(pos.x, pos.y - 35, 40, 40)

        c.lineWidth = 3
        c.strokeStyle = colorKingYellow
        c.strokeRect(pos.x, pos.y - 35, 40, 40)
    }

    static drawNickNameA() {
        const pos = {
            x: canvas.width - 70,
            y: canvas.height - 260 - 70
        }


        c.fillStyle = colorBlueUser
        c.textAlign = 'right'
        c.font = 'bold 30px sans-serif'
        c.fillText(Player.A.nickname, pos.x - 10, pos.y )
        c.textAlign = 'left'
 
        c.fillRect(pos.x, pos.y - 35, 40, 40)

        c.lineWidth = 3
        c.strokeStyle = colorKingYellow
        c.strokeRect(pos.x, pos.y - 35, 40, 40)
    }

    static drawNicknames() {
        Player.drawNickNameA()
        Player.drawNickNameB()
    }

    getScreenPos(x, y, width, height) {
        return this.orientation === 0 ? { x, y } : { x: x, y: canvas.height - y - height - 64 * 4 } 
    }

    playCard(deckCard, pos) {
        const pawn = new deckCard.selectionPawn({ pos: pos })
        this.setAsMyPawn(pawn)
        Elixir.decreaseElixir(pawn.elixirCost)
    }

    isCurrentPlayer() {
        return this == Client.currentPlayer
    }

}