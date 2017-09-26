var Messages = {
};

var Environment = {
    mfpUrl: 'http://172.17.2.111:9080/mfp',
};

var wlInitOptions = {
    applicationId : 'org.michenux.mobilefirst.websdk',
    platform: 'web',
    mfpContextRoot: Environment.mfpUrl
};

document.getElementById("startInit").addEventListener("click", function() {
    console.log("startInit");
    ibmmfpfanalytics.addEvent({'InitClick':true});

    WL.Client.init(wlInitOptions).then( function() {
        document.getElementById("queryUnprotected").addEventListener("click", queryUnprotected);
        document.getElementById("queryProtected").addEventListener("click", queryProtected);
        document.getElementById("genCrash").addEventListener("click", genCrash);
        document.getElementById("sendLogs").addEventListener("click",sendLogs);

        userLoginChallengeHandler = UserLoginChallengeHandler();
        showLoginDiv();
    }); 
});