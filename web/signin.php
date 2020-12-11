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
                <h1>Sign in</h1>
                <h3>To access the site you need an account. Create one below.</h3>
            </div>
        </div>


        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <div class="usernameChange">
            <input type="text" name="username" v-model="username">&nbsp;&nbsp;Username
            </div>
             <p v-if="username.length < 1" class="errorMessage">Your username needs to be over 2 characters long </p>
            <br>
            <div class="passwordChange">
            <input type="text" name="password" v-model="password">&nbsp;&nbsp;Password
            </div>
            <p v-if="password.length < 1" class="errorMessage">Your password needs to be over 2 characters long  </p>
            <br>
            <div class="nameChange">
            <input type="text" name="name" v-model="name">&nbsp;&nbsp;Name
            <p v-if="name.length < 1" class="errorMessage">Your name needs to be over 2 characters long.</p>
            </div>
            <br/>
            <br/>
            <input type="submit" name="submit" value="Register" class="signInButton">
        </form> 
   


    <?php 
    // Registration form
    if(isset($_POST['submit']))
    {
        require_once('databaseConnect.php');
        // remove special characters
        // adding basic security (mysqli_real_escape_string) to avoid SQL injection (' or 0=0 #)
        $username = $conn->real_escape_string($_POST['username']);
        // adding basic password hash encryption
        $password = sha1($_POST['password']);
        $name = $conn->real_escape_string($_POST['name']);
        // check if username exist, else insert
        $check = $conn->query("SELECT username from user WHERE username = '$username' LIMIT 1");
        if ($check->num_rows == 1) echo ' <div class="userRegi"><p>Username already exists!</p> </div>';
        else 
        {
            $insert = "INSERT INTO user (id, username, password, name) VALUES (NULL, '$username', '$password', '$name')";
            if($conn->query($insert))
            {
                echo '<div class="userRegi"> New user witn name = "' . $name . '" registered! </div>';
            }
            else
            {
                echo '<div class="userRegi">Something went wrong </div>';
            }
        }
        $conn->close();
    }
?>



     <div class="row">
         <div class="col-12">
        <a href="../index.html" class="backToFront">Return to frontpage</a>
        </div>
    </div>


    <div class="fyldeDiv3"></div>

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