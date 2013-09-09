function CharacterController() {

    var player;
    var that = this;
    
    this.tickIntervalId = null;

    this.startTicking = function(interval) {
        console.log("startticking: " + player.getId());
        if (that.tickIntervalId == null) {
            console.log("STARTED!");
            that.tickIntervalId = setInterval(tick, interval);
        }
    };

    this.stopTicking = function() {
        clearInterval(tickIntervalId);
        that.tickIntervalId = null;
    };

    this.getPlayer = function() {
        return player;
    };

    this.setPlayer = function(_player) {
        player = _player;
    };

    /*
     * code executed on every tick
     */
    function tick() {
//        if (player.getId() != "local")
//            console.log("ticking: " + player.getId());
        changePosition();
    }
    ;

    /*
     * changes position of local character depending on its activity, direction and speed
     * this function is called on every tick
     */
    function changePosition() {
        if (player.getActivity() === Player.activity.WALK) {
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


