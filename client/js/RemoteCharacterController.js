function RemoteCharacterController(playerArg) {

    var player = playerArg;
    var tickIntervalId;
    
    var that = this;

    this.startTicking = function(interval) {
        tickIntervalId = setInterval(tick, interval);
    };

    this.stopTicking = function() {
        clearInterval(tickIntervalId);
    };

    this.getPlayer = function() {
        return player;
    }

    function tick() {
        changePosition();
    }

    /*
     * changes position of local character depending on its activity, direction and speed
     * this function is called on every tick
     */
    function changePosition() {
        if (player.getActivity() == Player.activity.WALK) {
            var updateInfo = {};
            switch (player.getDirection()) {
                case Player.direction.UP:
                    updateInfo.posY = player.getPosY() - player.getWalkSpeed();
                    break;
                case Player.direction.UPLEFT:
                    updateInfo.posY = player.getPosY() - player.getWalkSpeed();
                    updateInfo.posX = player.getPosX() - player.getWalkSpeed();
                    break;
                case Player.direction.LEFT:
                    updateInfo.posX = player.getPosX() - player.getWalkSpeed();
                    break;
                case Player.direction.DOWNLEFT:
                    updateInfo.posX = player.getPosX() - player.getWalkSpeed();
                    updateInfo.posY = player.getPosY() + player.getWalkSpeed();
                    break;
                case Player.direction.DOWN:
                    updateInfo.posY = player.getPosY() + player.getWalkSpeed();
                    break;
                case Player.direction.DOWNRIGHT:
                    updateInfo.posY = player.getPosY() + player.getWalkSpeed();
                    updateInfo.posX = player.getPosX() + player.getWalkSpeed();
                    break;
                case Player.direction.RIGHT:
                    updateInfo.posX = player.getPosX() + player.getWalkSpeed();
                    break;
                case Player.direction.UPRIGHT:
                    updateInfo.posX = player.getPosX() + player.getWalkSpeed();
                    updateInfo.posY = player.getPosY() - player.getWalkSpeed();
                    break;
            }
            player.update(updateInfo);
        }
    }
}

