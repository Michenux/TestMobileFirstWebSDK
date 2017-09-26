
var userLoginChallengeHandler;

function showLoginDiv() {

    if ( document.getElementById('loginDiv').style.display === 'none') {
        document.getElementById('protectedDiv').style.display = 'none';
        document.getElementById('statusMsg').innerHTML = "";
        document.getElementById('loginDiv').style.display = 'block';
        document.getElementById('buttonDiv').style.display = 'block';
    }
}

function showProtectedDiv() {
    document.getElementById('loginDiv').style.display = 'none';
    document.getElementById('protectedDiv').style.display = 'block';
    document.getElementById('buttonDiv').style.display = 'block';
}


function queryUnprotected() {
    console.log("--> queryUnprotected");

    var resourceRequest = new WLResourceRequest("/adapters/javaAdapter/resource/unprotected", WLResourceRequest.GET);
    resourceRequest.send().then(
    function (response) {
        document.getElementById("statusMsg").innerHTML = "Unprotected response: " + response.responseText;
    },
    function (response) {
        document.getElementById("statusMsg").innerHTML = "Failed to query unprotected: " + JSON.stringify(response);
    });
}

function queryProtected() {
    console.log("--> queryProtected");

    var resourceRequest = new WLResourceRequest("/adapters/javaAdapter/resource/protected", WLResourceRequest.GET);
    resourceRequest.send().then(
    function (response) {
        document.getElementById("statusMsg").innerHTML = "Protected response: " + response.responseText;
    },
    function (response) {
        document.getElementById("statusMsg").innerHTML = "Failed to query Protected: " + JSON.stringify(response);
    });
}

function genCrash() {
    document.getElementById("inexistingElement").innerHTML = "Toto";
}


function sendLogs() {
    ibmmfpfanalytics.send();
}
