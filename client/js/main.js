
(function($) {
    $(function() {

        $('#gobutton').click(function() {
            if ($('#nameinput').val().length >= 3) {
                $('#textmessage').remove();
                startGame();
            } else {
                alert("You name is too short!");
            }
        });

        function startGame() {
            var game = new Game();
            var socketHandler = new SocketHandler('http://localhost:3000', game);
        }
    });
})(jQuery);
