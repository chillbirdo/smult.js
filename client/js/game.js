
(function($) {
    $(function() {

        var localPlayer = new Player();
        var localCharacterController = new LocalCharacterController(localPlayer);
        var localInputReader = new LocalInputReader(localCharacterController.onKeyEvent);


        setInterval(localCharacterController.changePosition, 10);

    });
})(jQuery);
