define(['sellbook', 'jQuery'], function (sellbook, $) {

    var init = function(){
        alert("submit book called");
        var bookJson = {
            "name": document.getElementById('BookName').value,
            "type": document.getElementById('bookform').elements["radios"].value,
            "description": document.getElementById('textdesc').value
        };


        $.ajax({
            url: "http://locahost:8080/books",
            type: "POST",
            data: JSON.stringify(bookJson),
            contentType: 'application/json; charset=UTF-8',
            success: function(response,status,xhr) {
                var res = JSON.parse(response);
                console.log(res);
                if(res){

                   alert(res);
                }
            },
            error: function() {
                alert(err);
            }
        });

    };


    return {
        init:init
    };
});