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
    <link rel="stylesheet" href="bootstrap.min.css">
    <link rel="stylesheet" href="style.css">
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
                    <li class="nav-item active">
                        <a class="nav-link" href="game-description.php">Game description</a>
                    </li>
                    <li class="nav-item">
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
        <div class="row">
            <div class="col-12">
                <h2 id="welcomeMessage">
                    Welcome to Escape the Death Star!
                </h2>
            </div>
        </div>

        <div class="row">
            <div class="col-12 gameDescription">
                <h4>You're playing as a Jedi Knight and you need to escape the Death Star. <br>
                    To escape the Death Star, you need to reach the goal without being caught by the Sith.</h4>
            </div>
        </div>


<div class="row">

<div class="col-12 gameTiles">
        <h3>These are the things you can encounter within the game</h3>
</div>
</div>

        <div class="row">

            <div class="col-6 karakterBeskrivelse">
                <p>This is the Jedi</p>
                <img src="images/avatar.png" alt="jedi avatar">
            </div>
            <div class="col-6 karakterBeskrivelse">
                <p>This is the Sith</p>
                <img src="images/enemy.png" alt="enemy avatar">
            </div>
        

        </div>


         <div class="row">

            <div class="col-6 karakterBeskrivelse">
                <p>This is the elevator to the exit</p>
                <img src="images/elevator.png" alt="finish tile">
            </div>
            <div class="col-6 karakterBeskrivelse">
                <p>On your way out, you need to collect these coins</p>
                <img src="images/coin.png" alt="collectible tile">
            </div>
        
        </div>

        <div class="row">
            <div class="col-12 vueHover">                
                <div v-on:mouseover="active = !active">
                    <h3>Hover me to see the last boss!</h3>
                </div>

                <div v-if="active" id="boss">
                    <img src="images/boss.png" alt="">
                    <h2>Darth Banes!</h2>
                </div>

             </div>
        </div>

       

         <div class="row">
            <div class="col-12">
                    <a href="game.php" class="backToFront1">Start game</a>
            </div>
         </div>


          <div class="row wRow">
                <div class="col-12 wCol footerClass">
                    <div id="footer">
                        <p>This is a fictional site. I am in no way associated with either LucasArts or Disney.</p>

                        <h4>Eksamensprojekt af Sara Nikoline Schou Andreasen</h4>


                    </div>
                </div>
            </div>
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