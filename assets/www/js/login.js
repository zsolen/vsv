function init() {
        document.addEventListener("deviceready", onDeviceReady, false);
};

function onDeviceReady() {

};

$(document).on('pagebeforeshow', '#login-page', function() {
    $(document).on('click', '#submitButton', function() {
        $("#submitButton").attr("disabled","disabled");
        if($('#username').val().length > 0 && $('#password').val().length > 0){
            var u = $('#username', form).val();
            var p = $('#password', form).val();
            $.ajax({
                url: 'check.php',
                data: {action : 'login', formData : $('#loginForm').serialize()}, // Convert a form to a JSON string representation
                type: 'post',
                async: true,
                beforeSend: function() {
                    $.mobile.showPageLoadingMsg(true);
                },
                complete: function() {
                    $.mobile.hidePageLoadingMsg();
                },
                success: function (result) {
                    if(result == "true"){
                        window.localStorage["username"] = u;
                        window.localStorage["password"] = p;
                        $.mobile.changePage("index.html", { transition: "pop" });
                    }
                    else{
                        alert('Fel användarnamn eller lösenord.');
                    }
                    $("#submitButton").removeAttr("disabled");
                },
                error: function (request,error) {
                    alert('Fel i ankopling mot servern.');
                    $("#submitButton").removeAttr("disabled");
                }
            });
//            $.mobile.changePage("index.html", { transition: "pop" });
        }
        else {
            alert('Användarnamn och/eller lösenord saknas')
            $("#submitButton").removeAttr("disabled");
        }
        return false;
//                $.mobile.changePage("index.html", { transition: "pop" });
    });
});