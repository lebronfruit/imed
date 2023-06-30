class Client {

    static currentPlayer = null

    static setCurrentPlayer(player) {
        Client.currentPlayer = player
        player.orientation = 0
    }


}