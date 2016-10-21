define(['CharacterController'], function(CharacterController) {

    function RemoteCharacterController(_player) {
        this.player = _player;
    };

    RemoteCharacterController.prototype = new CharacterController();

    return RemoteCharacterController;
});