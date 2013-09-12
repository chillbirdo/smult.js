function Player(playerName, htmlHandler, remotePlayerId, remoteUpdatablePlayerInfo) {

    var id;
    var name = playerName;
    var characterAnimator;
    var walkSpeed = 3;
    var updatablePlayerInfo;

    if (!remoteUpdatablePlayerInfo || !remotePlayerId) {
        id = 'local';
        updatablePlayerInfo = {
            direction: Player.direction.UPRIGHT,
            activity: Player.activity.STAND,
            posX: Math.floor((Math.random() * (window.innerWidth - 150)) + 1),
            posY: Math.floor((Math.random() * (window.innerHeight - 250)) + 1)
        };
    } else {
        id = remotePlayerId;
        updatablePlayerInfo = remoteUpdatablePlayerInfo;
    }

    characterAnimator = new CharacterAnimator(id, updatablePlayerInfo, name, htmlHandler);


    this.update = function(updatePlayerInfo) {
        for (var key in updatePlayerInfo) {
            if (updatePlayerInfo[key]) {
                updatablePlayerInfo[key] = updatePlayerInfo[key];
            }
        }
        characterAnimator.update(updatePlayerInfo);
//        console.log( this.toString());
    };

    this.disappear = function() {
        characterAnimator.removePlayerElement();
    };

    this.getDirection = function() {
        return updatablePlayerInfo.direction;
    };
    this.getActivity = function() {
        return updatablePlayerInfo.activity;
    };
    this.getPosX = function() {
        return updatablePlayerInfo.posX;
    };
    this.getPosY = function() {
        return updatablePlayerInfo.posY;
    };
    this.getWalkSpeed = function() {
        return walkSpeed;
    };
    this.getId = function() {
        return id;
    };
    this.getName = function() {
        return name;
    };
    this.getUpdatablePlayerInfo = function() {
        return updatablePlayerInfo;
    };
    this.toString = function() {
        return "id: " + this.getId() + "; name: " + this.getName() + "; posX: " + this.getPosX() + "; posY: " + this.getPosY() + "; direction: " + this.getDirection() + "; activity: " + this.getActivity();
    };
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