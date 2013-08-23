function Player(remotePlayerInfo) {

    var updatablePlayerInfo;
    var characterAnimator;

    if (!remotePlayerInfo) {
        updatablePlayerInfo = {
            id: 'local',
            direction: Player.direction.UPRIGHT,
            activity: Player.activity.STAND,
            posX: 100,
            posY: 100,
            speed: 3
        };
    } else {
        updatablePlayerInfo = remotePlayerInfo;
    }

    characterAnimator = new CharacterAnimator(updatablePlayerInfo);


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
    
    /*
     * this is called when the player disconnects
     */
    this.disappear = function(){
        characterAnimator.removeCharacterElement();
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
    this.getId = function(){
        return updatablePlayerInfo.id;
    }
    this.getUpdatablePlayerInfo = function(){
        return updatablePlayerInfo;
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