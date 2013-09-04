function Game(localPlayerName, htmlHandler) {

    var TICK_DELAY_MS = 10;

    var localPlayer = new Player(localPlayerName, htmlHandler);
    var localCharacterController = new LocalCharacterController(localPlayer);
    var remoteCharacterControllers = {};

    localCharacterController.startTicking(TICK_DELAY_MS);

    /*
     * returns the actual state of the local player.
     * note that this is used for client-server-setup only, playerchanges are pushed via sendUpdateFunc
     */
    this.getLocalPlayerUpdatableInfos = function() {
        return localCharacterController.getPlayer().getUpdatablePlayerInfo();
    };

    /*
     * returns the name of the local player
     * note that this is used for client-server-setup only
     */
    this.getLocalPlayerName = function() {
        return localCharacterController.getPlayer().getName();
    };

    /*
     *  interface to sockethandler: registers the method where changes of the state of the local player are pushed to 
     */
    this.onConnected = function(sendUpdateFunc) {
        localCharacterController.registerSendUpdateFunc(sendUpdateFunc);
        htmlHandler.onConnected();
    };

    /*
     * interface to localinputreader: returns method that reacts on keyevents (userinput)
     */
    this.getLocalPlayerOnKeyEventMethod = function() {
        return localCharacterController.onKeyEvent;
    };

    this.updateRemotePlayer = function(remotePlayerId, remoteUpdatablePlayerInfo) {
        remoteCharacterControllers[remotePlayerId].getPlayer().update(remoteUpdatablePlayerInfo);
    };

    this.addRemotePlayer = function(remotePlayerId, remoteUpdatablePlayerInfo, remotePlayerName) {
        if (remoteCharacterControllers[remotePlayerId]) {
            console.log("UNEXPECTED: wanted to add player that already existed!");
            return;
        }
        console.log("game: adding new player " + remotePlayerId);
        var remotePlayer = new Player(remotePlayerName, htmlHandler, remotePlayerId, remoteUpdatablePlayerInfo);
        var remoteCharacterController = new RemoteCharacterController(remotePlayer);
        remoteCharacterControllers[remotePlayerId] = remoteCharacterController;
        remoteCharacterControllers[remotePlayerId].startTicking(TICK_DELAY_MS);
        htmlHandler.updatePlayerAmount(Object.keys(remoteCharacterControllers).length + 1);
    };

    this.removeRemotePlayer = function(remotePlayerId) {
        remoteCharacterControllers[remotePlayerId].getPlayer().disappear();
        remoteCharacterControllers[remotePlayerId].stopTicking();
        delete remoteCharacterControllers[remotePlayerId];
        htmlHandler.updatePlayerAmount(Object.keys(remoteCharacterControllers).length + 1);
        console.log("game: removed player " + remotePlayerId);
    };
}