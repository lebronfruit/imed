class Screen {

    static zoom = 200 / 100

    static translateXY(x, y) {
        return {
            x: x * Screen.zoom,
            y: y * Screen.zoom,
        }
    }

    static translateX(x) {
        return x * Screen.zoom
    }

    static translateY(y) {
        return y * Screen.zoom
    }

    static translateWidth(width) {
        return width * Screen.zoom
    }

    static translateHeight(height) {
        return height * Screen.zoom
    }

    static roundRect(x, y, width, height, round) {
        ctx.roundRect(
            Screen.translatetX(x),
            Screen.translateY(y),
            Screen.translateWidth(width),
            Screen.translateHeight(height), round
        )
    }

    static roundedSet(x, y, width, height, round) {
        roundedSet(
            Screen.translatetX(x),
            Screen.translateY(y),
            Screen.translateWidth(width),
            Screen.translateHeight(height), round
        )
    }

    static drawImage(img, x, y, width, height) {
        ctx.drawImage(img,
            Screen.translatetX(x),
            Screen.translateY(y),
            Screen.translateWidth(width),
            Screen.translateHeight(height)
        )
    }
}
