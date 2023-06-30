class Waypoint {

    constructor(waypoints) {
        this.waypoints = fillPathway(waypoints)
    }
    
    draw() {
        c.fillStyle = 'lime'
        this.waypoints.forEach(point => {
            c.fillRect(point.x, point.y, 64, 64)
        })
        
    }

    static draw() {
        Waypoint.LeftLane.draw()
        Waypoint.RightLane.draw()
    }
}

function getDistance(a, b) {
    var deltaPosition = {
        x: Math.abs(a.x - b.x),
        y: Math.abs(a.y - b.y),
    }
    return Math.sqrt(deltaPosition.x ** 2 + deltaPosition.y ** 2)
}

function fillPathway(pathway) {
    var waypoints = []
    for (var i = 0; i < pathway.length - 1; i++) {
        const pointA = pathway[i]
        const pointB = pathway[i + 1]
        const deltaSpace = {
            x: pointB.x - pointA.x,
            y: pointB.y - pointA.y,
        }
        const angle = Math.atan2(deltaSpace.y, deltaSpace.x)
        var distance = getDistance(pointA, pointB)
        var amount = Math.ceil(distance / 64)

        waypoints.push[pointA]
        for (var k = 0; k < amount; k++) {
            waypoints.push({
                x: pointA.x + Math.cos(angle) * 64 * k,
                y: pointA.y + Math.sin(angle) * 64 * k,
            })
            //console.log("k:", k)
        }
        waypoints.push[pointB]
    }
    waypoints.push(pathway[pathway.length-1])
    return waypoints
}

Waypoint.LeftLane = new Waypoint([
    {
        "x": 381.754385964912,
        "y": 1121.30994152047
    },
    {
        "x": 157.19298245614,
        "y": 1118.31578947368
    },
    {
        "x": 160.187134502924,
        "y": 160.187134502924
    },
    {
        "x": 377.263157894737,
        "y": 157.19298245614
    },
])

Waypoint.RightLane = new Waypoint([
    {
        "x": 512,
        "y": 1118
    },
    {
        "x": 734,
        "y": 1118
    },
    {
        "x": 736,
        "y": 160
    },
    {
        "x": 510,
        "y": 158
    }
])

