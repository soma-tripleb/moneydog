function start() {
    gapi.load('auth2', function () {
        auth2 = gapi.auth2.init({
            client_id: '532345922072-50gar7lh5ca5rvepjs7iisa6lu28d741.apps.googleusercontent.com',
            // Scopes to request in addition to 'profile' and 'email'
            scope: 'profile email https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly',
        });
    });
}

$('#signinButton').click(function() {
    // signInCallback defined in step 6.
    auth2.grantOfflineAccess().then(signInCallback);
});

function signInCallback(authResult) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'https://localhost:8080/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-ur' +
        'lencoded');
    xhr.onload = function() {
        console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + authResult['code']);

    /*
    if (authResult['code']) {

        // Hide the sign-in button now that the user is authorized, for example:
        $('#signinButton').attr('style', 'display: none');

        // Send the code to the server
        $.ajax({
            type: 'POST',
            url: 'https://localhost:8080/tokensignin',
            data: authResult['code'],
            // Always include an `X-Requested-With` header in every AJAX request,
            // to protect against CSRF attacks.
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            },
            contentType: 'application/octet-stream; charset=utf-8',
            success: function(data) {
                // Handle or verify the server response.
                console.log("SUCCESS: " + data);
            },
            processData: false,
        });
    } else {
        // There was an error.
    }
    */
}