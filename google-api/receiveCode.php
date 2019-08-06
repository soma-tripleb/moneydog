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
                client_id : <input type="text" name="client_id" value="532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com"><br>
                client_secret : <input type="text" name="client_secret" value="4a_yXFTAFWHCKAvpfeu6bzpl"><br>
                redirect_uri : <input type="text" name="redirect_uri" value="http://localhost:8000/receiveCode.php"><br>
                grant_type : <input type="text" name="grant_type" value="authorization_code"><br>
                <input type="submit">
            </form>
        </div>
    </body>
</html>

