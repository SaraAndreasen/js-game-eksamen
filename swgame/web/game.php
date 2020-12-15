<?php
    // Secret page
    session_start();
    if ($_SESSION['logged_in'] == true)
    { 
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="bootstrap.min.css">
    <meta name="robots" content="noindex">
    <meta name="googlebot" content="noindex">
    <title>Escape the Death Star</title>
</head>

<body>
    <div id="app">
        <div class="container-fluid">

            <nav class="navbar navbar-expand-lg navbar-dark customNavbar">
                <a class="navbar-brand" href="game-description.php">Death Star game</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="game-description.php">Game description</a>
                    </li>
                    <li class="nav-item active">
                        <a class="nav-link" href="game.php">The game <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="logout.php">Log out</a>
                    </li>
                    </ul>
                </div>
            </nav>

                    <div class="row">

            <div class="d-block d-sm-none d-none d-sm-block d-md-none d-none d-md-block d-lg-none">
                <h1 id="warningMessage">
                    WARNING:
                    <br>
                    These pages only work on computers. If you're here on phone or tablet, please switch to a computer.
                </h1>
                </div>

            </div>

            <div class="row gameTileRow">
                 <div class="col-12 gameTitle">
                  <h1>Escape the Death Star!</h1>

                </div>


            </div>

            
            
            
            <canvas width="500" height="500" id="canvas">

                </canvas>
            
            <p id="coinAmount"></p>
            <p id="moreCoins"></p>

            <div class="timebox">
                <p>Time left to complete all levels</p>
            <input type="text" id="minutes"> 
            <input type="text" id="seconds">
            <p id="timerMessage"></p>
            </div>

         
        <a href="game.php" id="restartButton">
            Restart
            </a>
        

            <div class="fyldeDiv5"></div>
        
               
        </div>
    </div>
     <!-- jQuery and Bootstrap Bundle + own JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
        crossorigin="anonymous"></script>
    <script src="main.js"></script>
</body>

</html>

<?php
    }
        else 
    {
        header("location: login.php");
    }
?>