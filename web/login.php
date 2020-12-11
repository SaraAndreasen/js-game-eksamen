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
     <div class="row">
            <div class="col-12 signInHead">
                <h1>Log in</h1>
                <h3>To access the site you need to log in.</h3>
            </div>
        </div>
    
        
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post" id="formLogin">
                    <div class="usernameIn">
                    <input type="text" name="username" v-model="username" id="username">&nbsp;&nbsp;Username 
                    </div>
                    <p v-if="username.length < 1" class="errorMessage">Your username needs to be over 2 characters long </p>
                    <br>
                    <div class="passwordIn">
                    <input type="text" name="password" v-model="password" id="password">&nbsp;&nbsp;Password 
                    </div>
                    <p v-if="password.length < 1" class="errorMessage">Your password needs to be over 2 characters long  </p>
                    <br>
                    <br>
                    <input type="submit" name="submit" value="Login" class="signInButton">
                </form>
                 

        
<?php
    // Login form
    if (isset($_POST['submit'])) {
        require_once("databaseConnect.php");
        // remove special characters
        // adding basic security (mysqli_real_escape_string) to avoid SQL injection (' or 0=0 #)
        $username = $conn->real_escape_string($_POST['username']);
        $password = sha1($_POST['password']);

        $read = "SELECT * FROM user WHERE username = '$username' AND password = '$password' LIMIT 1";
        $result = $conn->query($read);
        $conn->close();
        // if the query is NOT returning anything there is no match in the database
        if (!$result->num_rows == 1) 
        {
           
        } 
        else 
        {
            // start a PHP session
            session_start();
            $_SESSION['logged_in'] = true;
            //redirect and stop present code
            header("Location: game-description.php"); 
            exit();      
        }
    }
?>



          <div class="row">
         <div class="col-12">
        <a href="../index.html" class="backToFront">Return to frontpage</a>
        </div>
    </div>

     <div class="fyldeDiv4"></div>

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
        <!-- jQuery + Bootstrap + own JS -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
            integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
            crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx"
            crossorigin="anonymous"></script>
        <script src="main.js"></script>
</body>
</html>