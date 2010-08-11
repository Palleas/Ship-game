<!DOCTYPE HTML>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Ship experiment (Version 0.1)</title>
    <link rel="stylesheet" href="assets/css/global.css" type="text/css" media="screen" >
  </head>
  
  <body>
    <h1>Ship experiment (Version 0.1)</h1>
    
    <p>Use left and right keys to turn, up to accelerate and space to fire.</p>
    
    <div id="gamePanel">
      <canvas id="stage" width="800" height="600"></canvas>
    </div>
    <div id="messages"></div>
    
    <?php if ($_SERVER['REMOTE_ADDR'] == '127.0.0.1') : ?>
      <script src="script/core.js"></script>
    <?php else : ?>
      <script src="script/core.min.js"></script>
    <?php endif ?>
  </body>
</html>