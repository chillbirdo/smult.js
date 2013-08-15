
(function($) {
    $(function() {

        var localCharacterElement = $('#character');

        var localCharacter = new Character();
        var characterAnimator = new CharacterAnimator(localCharacter, localCharacterElement);
        var localCharacterController = new LocalCharacterController(localCharacter, characterAnimator);
        var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);

        var game = new Game(localCharacterController);
    });
})(jQuery);
