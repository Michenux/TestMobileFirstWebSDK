var UserLoginChallengeHandler = function() {
    var isChallenged = false;
    var securityCheckName = 'UserLogin';
    var userLoginChallengeHandler = WL.Client.createSecurityCheckChallengeHandler(securityCheckName);

    document.getElementById("login").addEventListener("click", login);
    document.getElementById("logout").addEventListener("click", logout);

    userLoginChallengeHandler.securityCheckName = securityCheckName;

    userLoginChallengeHandler.handleChallenge = function(challenge) {
        console.log("--> userLoginChallengeHandler.handleChallenge", challenge);
        isChallenged = true;
        if (challenge.errorMsg) {
            userLoginChallengeHandler.authWithForm( challenge );
        } 
    };

    userLoginChallengeHandler.handleSuccess = function(user) {
        console.log("--> userLoginChallengeHandler.handleSuccess");
        ibmmfpfanalytics.setUserContext(user);
        console.log("user", user);
        isChallenged = false;
        document.getElementById('username').value = "";
        document.getElementById('password').value = "";
        document.getElementById("statusMsg").innerHTML = "Connected";
        showProtectedDiv();
    };

    userLoginChallengeHandler.handleFailure = function(error) {

        console.log("--> userLoginChallengeHandler.handleFailure: " + error.errorMsg);
        isChallenged = false;
        if (error.errorMsg !== null) {
            document.getElementById("statusMsg").innerHTML = error.errorMsg;
        } else {
            document.getElementById("statusMsg").innerHTML = "Failed to login.";
        }
    };

    userLoginChallengeHandler.authWithForm = function( challenge ) {
        console.log('--> userLoginChallengeHandler.authWithForm');
        showLoginDiv();
        var statusMsg = challenge.errorMsg;
        if ( statusMsg !== null ) {
            document.getElementById("statusMsg").innerHTML = statusMsg;
        }
    }

    function login() {
        console.log("--> userLoginChallengeHandler.login");
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username === "" || password === ""){
            alert("Username and password are required");
            return;
        }
        if (isChallenged){
            console.log("login challenged, call submitChallengeAnswer");
            userLoginChallengeHandler.submitChallengeAnswer({'username':username, 'password':password,
                'app': Environment.appName}); 
        } else {
            console.log("login not challenged, call WLAuthorizationManager.login");
            WLAuthorizationManager.login(securityCheckName,{'username':username, 
                'password':password }).then(
                function () {
                    console.log('login onSuccess');
                },
                function (response) {
                    console.log("login onFailure: " + JSON.stringify(response));
                    if (response.errorMsg !== null) {
                        document.getElementById("statusMsg").innerHTML = response.errorMsg;
                    } else {
                        document.getElementById("statusMsg").innerHTML = "Failed to login.";
                    }
                });
        }
    }

    
    function logout() {
        console.log("--> userLoginChallengeHandler.logout");
        WLAuthorizationManager.logout(securityCheckName).then(
        function () {
            console.log("logout success");
            ibmmfpfanalytics.setUserContext(null);
            showLoginDiv();
        },
        function (response) {
            console.log("logout error", response );
        });
    }

    return userLoginChallengeHandler;

};