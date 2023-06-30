const pawnTilesData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const pawnPlacementTilesData2D = []

for (let i = 0; i < pawnTilesData.length; i += 14) { //14 map width
    pawnPlacementTilesData2D.push(pawnTilesData.slice(i, i + 14))
}


class PlacementTile {

	static list = []
	static width = 64
    static height = 64
    static active = null

	constructor({ pos = {x:0, y:0 } }) {
        this.pos = pos
        
		this.width = PlacementTile.width
        this.height = PlacementTile.height
        PlacementTile.list.push(this)
	}

    moveToOwnCenter() {
        this.pos.x += this.width / 2
        this.pos.y += this.height / 2
    }

    getCenter() {
        return {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2,
		}
    }


	draw() {
		c.fillStyle = 'rgba(100, 255, 100, 0)'
		c.fillRect(this.pos.x, this.pos.y, this.width, this.height)
	}

	update() {
		this.draw()
    }

    isHovering(mx, my) {
        const center = this.getCenter()
        return mx > this.pos.x && mx < this.pos.x + this.width 
            && my > this.pos.y && my < this.pos.y + this.height
    }

    static updateTiles() {
        var selection = null
        for (let i = 0; i < PlacementTile.list.length; i++) {
            const placementTile = PlacementTile.list[i]
            placementTile.update()
            if (!selection) {
                selection = placementTile.isHovering(mouse.playX, mouse.playY) ? placementTile : null
			}
        }
        PlacementTile.active = selection

    }

}

pawnPlacementTilesData2D.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol == 14) { //14 data symbol
            PlacementTile.list.push(
                new PlacementTile({
                    pos: {
                        x: x * 64,
                        y: y * 64,
                    }
                })
            )
        }
    })
})