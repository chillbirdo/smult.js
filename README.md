FIRST OF ALL: <a href="http://gilber.vs120026.hl-users.com/WEBSITES/smult.js/" title="smult"> > > > > TRY!! < < < <</a>

<a href="http://gilber.vs120026.hl-users.com/WEBSITES/smult.js/">
<img src="http://gilber.vs120026.hl-users.com/wordpress/blogimages/smultjs.jpg"></img> 
</a>

Technology used: Client: <b>Html5, JavaScript, CSS, Spritely</b>; Server: <b>NodeJS, socket.io</b>

As a little experiment I decided to make a realtime client-server application solely in JS, where I used the graphics of a game, that I was working on long ago: <a href="http://gilber.vs120026.hl-users.com/WEBSITES/Portfolio/techwork_smult.html" title="SMULT">SMULT</a>. The graphics has once been designed by <a href="http://www.linkedin.com/in/cherzog">Christian Herzog</a>, a former university colleague.
The project could be used as a good starting point if you want to create a HTML5 game with similar concept.

Here is a little diagramm, sketching the dataflow of the application. The most central object here is <i>Game</i>, holding one <i>LocalPlayerController</i> and x <i>RemotePlayerControllers</i>. The <i>LocalPlayerController</i> gets inputdata from the <i>LocalInputHandler</i>, updates the local player and sends these changes to the <i>SocketHandler</i>. Moreover, the <i>LocalPlayerController</i> executes "ticks" every 10 milliseconds, which moves the player in case its state is "WALK". The <i>RemotePlayerControllers</i> receives its updates from the server. When the <i>LocalPlayerController</i> performs any changes, it sends an update to the server, which immediately broadcasts the changes to all the other players.

<img src="http://gilber.vs120026.hl-users.com/wordpress/blogimages/dataflow.jpg"></img> 

Please visit the <a href='https://github.com/gilbertfritz/smult.js'>GitHub page</a> to get the code.
