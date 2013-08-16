
(function($) {
    $(function() {

        var game = new Game();
        var socketHandler = new SocketHandler('http://localhost:3000', game);

    });
})(jQuery);
