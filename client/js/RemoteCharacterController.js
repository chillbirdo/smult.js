define(['CharacterController'], function(CharacterController) {

    function RemoteCharacterController(_player) {
        this.setPlayer(_player);
    };

    RemoteCharacterController.prototype = new CharacterController();

    return RemoteCharacterController;
});