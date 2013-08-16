function Game() {

    var TICK_DELAY_MS = 25;

    var localPlayer = new Player();
    var localCharacterController = new LocalCharacterController( localPlayer);
    var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);

    var remotePlayers = [];


    this.setSendUpdateFunc = function(sendUpdateFunc) {
        getCharacterController.setSendUpdateFunc(sendUpdateFunc);
    }

    this.addRemotePlayer = function(remotePlayerInfo) {
        remotePlayers.push( new Player(remotePlayerInfo));
    };

    this.removeRemotePlayer = function() {

    };
    
    this.getLocalPlayer = function(){
      return localPlayer;  
    };
    
    this.getRemotePlayers = function(){
        return remotePlayers;
    };
}