function Player() {
    
    var updatablePlayerInfo = {
        direction : Player.direction.UPRIGHT,
                activity : Player.activity.STAND,
                posX : 100,
                posY : 100,
                speed : 3
    };
    
    var characterAnimator;
    
    this.init = function( id){
        updatablePlayerInfo.id = id;
        characterAnimator = new CharacterAnimator(updatablePlayerInfo);
//        characterAnimator.update({activity: updatablePlayerInfo.activity, direction: updatablePlayerInfo.direction});
    };


    this.update = function(updatePlayerInfo) {
        characterAnimator.update(updatePlayerInfo);
        if (updatePlayerInfo.activity) {
            updatablePlayerInfo.activity = updatePlayerInfo.activity;
        }
        if (updatePlayerInfo.direction) {
            updatablePlayerInfo.direction = updatePlayerInfo.direction;
        }
        if (updatePlayerInfo.posX) {
            updatablePlayerInfo.posX = updatePlayerInfo.posX;
        }
        if (updatePlayerInfo.posY) {
            updatablePlayerInfo.posY = updatePlayerInfo.posY;
        }
    };

    this.getDirection = function() {
        return updatablePlayerInfo.direction;
    };
    this.getActivity = function() {
        return updatablePlayerInfo.activity;
    };
    this.getPosX = function() {
        return updatablePlayerInfo.posX;
    }
    this.getPosY = function() {
        return updatablePlayerInfo.posY;
    }
    this.getSpeed = function() {
        return updatablePlayerInfo.speed;
    }
}

Player.direction = {
    "UP": 1,
    "UPRIGHT": 2,
    "RIGHT": 3,
    "DOWNRIGHT": 4,
    "DOWN": 5,
    "DOWNLEFT": 6,
    "LEFT": 7,
    "UPLEFT": 8
};

Player.activity = {
    "WALK": 1,
    "STAND": 2,
    "BORED": 3,
    "TAKE": 4,
    "TAKEFROMGROUND": 5,
    "HADOUKEN": 6,
    "CHEER": 7
};