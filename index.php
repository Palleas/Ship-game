<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Ship experiment (Version 0.2)</title>
    <link rel="stylesheet" href="assets/css/global.css" type="text/css" media="screen" >
  </head>
  
  <body>
    <div id="game">
      <canvas id="background" width="800" height="600"></canvas>
      <canvas id="stage" width="800" height="600"></canvas>
      <div id="modal"></div>
      <div id="presentation">
        <h1>Ship experiment (Version 0.2)</h1>
        <p>You are a space ship, and bad stuffs coming from outer space want to destroy you (and let's say earth too, so it can be very dramatic). Use left, right keys to turn, up to accelerate and down to brake. Eventually use your space bar to fire if you've understood what I just said.</p>
        <p>This game uses canvas and HTML5, please don't use it in a "flash-this-not-that" contest, I've only been working on this because it's fun, not because it's supposed to kill flash eventually.</p>
        <p>If you like it, don't forget to <a href="http://twitter.com/palleas">say hi on Twitter</a> !</p>
        
        <a href="#play" id="playButton">Play !</a>
      </div>
    </div>
    
    <script src="script/geom.js"></script>
    <script src="script/core.js"></script>
  </body>
</html>