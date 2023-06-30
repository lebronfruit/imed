class mouse {
    static x = 0
    static y = 0

    static update(event) {
        mouse.x = Screen.translateX(event.clientX)
        mouse.y = Screen.translateY(event.clientY)
    }
}
