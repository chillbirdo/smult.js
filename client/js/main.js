
(function($) {
    $(function() {

        var htmlHandler = new HtmlHandler(onStartGame);

        function onStartGame(localPlayerName) {
            var game = new Game(localPlayerName, htmlHandler);
            var localInputReader = new LocalInputReader(game.getLocalPlayerOnKeyEventMethod());
            var socketHandler = new SocketHandler(game);
            htmlHandler.updatePlayerAmount(1);
        }
    });
})(jQuery);
