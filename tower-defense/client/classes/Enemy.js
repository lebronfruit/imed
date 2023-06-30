class Enemy {

    constructor() {
    }

    
}

class EnemyService {

    constructor(player) {
        this.list = []
        this.towerList = []
        this.pawnList = []
        this.player = player
    }

    destroy(entity) {
        for (let i = 0; i < Player.list.length; i++) {
            const player = Player.list[i]
            var myTypelist = undefined
            if (entity instanceof Tower) {
                myTypelist = player.EnemyService.towerList
            }
            else if (entity instanceof Pawn) {
                myTypelist = player.EnemyService.pawnList
            }
            var index = myTypelist.indexOf(entity)
            //print("Enemyservice of ", this.player.nickname, "index of entit to destroy:", entity.entity)
            myTypelist.splice(index, 1)
            
        }

        //console.log("destroyed enemy")
       
    }
    

    identify(entity) {
        Player.list.forEach(player => {
            if (entity.player === player) {
                //nothing
               // console.log(player.nickname, "skipping enemy")
            }
            else {
                //console.log("adding enemy")
                if (entity instanceof Tower) {
                    player.EnemyService.typelist = player.EnemyService.towerList
                }
                else if (entity instanceof Pawn) {
                    player.EnemyService.typelist = player.EnemyService.pawnList
                }
                player.EnemyService.typelist.push(entity)
            }
        })
    }

}