function Character() {
    //fields
    var direction = Character.direction.UPRIGHT;
    var activity = Character.activity.STAND;
    var posX = 100;
    var posY = 100;
    var speed = 3;

    this.update = function(updateInfo) {
        if (updateInfo.activity) {
            activity = updateInfo.activity;
        }
        if (updateInfo.direction) {
            direction = updateInfo.direction;
        }
        if (updateInfo.posX){
            posX = updateInfo.posX;
        }
        if (updateInfo.posY){
            posY = updateInfo.posY;
        }
    };
    
    this.getDirection = function() {
        return direction;
    };
    this.getActivity = function() {
        return activity;
    };
    this.getPosX = function() {
        return posX;
    }
    this.getPosY = function() {
        return posY;
    }
    this.getSpeed = function() {
        return speed;
    }
}

Character.direction = {
    "UP": 1,
    "UPRIGHT": 2,
    "RIGHT": 3,
    "DOWNRIGHT": 4,
    "DOWN": 5,
    "DOWNLEFT": 6,
    "LEFT": 7,
    "UPLEFT": 8
};

Character.activity = {
    "WALK": 1,
    "STAND": 2,
    "BORED": 3,
    "TAKE": 4,
    "TAKEFROMGROUND": 5,
    "HADOUKEN": 6,
    "CHEER": 7
};