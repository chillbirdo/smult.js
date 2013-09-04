
(function($) {
    $(function() {

        var loadingMessageElement = $('#loadingmessage');
        var stageElement = $('#stage');
        var nameInputElement = $('#nameinput');
        var playersConnectedElement = $('#playersconnected');

        nameInputElement.focus();
        loadingMessageElement.hide();
        stageElement.hide();
        playersConnectedElement.hide();

        $('#nameform').submit(function() {
            var localPlayerName = nameInputElement.val();
            if (localPlayerName.length >= 2) {
                $('#namedialog').remove();
                $('#loadingmessage').show();
                startGame(localPlayerName);
            } else {
                alert("You name is too short!");
            }
            return false;
        });

        function startGame(localPlayerName) {
            var game = new Game(localPlayerName, updatePlayerAmount);
            var localInputReader = new LocalInputReader(game.getLocalPlayerOnKeyEventMethod());
            var socketHandler = new SocketHandler(game, onConnected);
            updatePlayerAmount(1);
        }

        function onConnected() {
            loadingMessageElement.hide();
            stageElement.show();
            playersConnectedElement.show();
        }

        function updatePlayerAmount(playerAmount) {
            $('#playeramount').html(playerAmount);
        }
    });
})(jQuery);
