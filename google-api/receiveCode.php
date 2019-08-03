<html>
    <style>
        input {
            width: 300px;
        }
    </style>
    <body>
        <div>
            <a href="login.html">login</a>
            <form action="https://www.googleapis.com/oauth2/v4/token" method="post"
                enctype="application/x-www-form-urlencoded">
                code : <input type="text" name="code" value="<?= $_GET['code']?>"><br>
                client_id : <input type="text" name="client_id" value="351412840107-snlb406p1o1ud17vld4enunetm4g3fmu.apps.googleusercontent.com"><br>
                client_secret : <input type="text" name="client_secret" value="vvlWWR9bh7C5dB_fnOgt25Vx"><br>
                redirect_uri : <input type="text" name="redirect_uri" value="http://localhost:8000/receiveCode.php"><br>
                grant_type : <input type="text" name="grant_type" value="authorization_code"><br>
                <input type="submit">
            </form>
        </div>
    </body>
</html>

