/**
 * Created by sachin on 30/7/17.
 */
define(['sellbook', 'jQuery','jqBootstrapValidation'], function (sellbook, $,jqBootstrapValidation) {

    $("#bookform input").jqBootstrapValidation({
        preventSubmit : true,
        submitError: function($form, event, errors) {
            // something to have when submit produces an error ?
            // Not decided if I need it yet
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
        },
        filter: function() {
            return $(this).is(":visible");
        }
    });

    function showAlert(success,msg){

        var classList = '',
            text = '',
            childClass ='',
            errorText = 'Error! Please try again after some time.',
            successTextEnglish = 'Book Posted Succesfully for Selling!';



        if(success){
            classList = "<div class='alert alert-success'>";
            childClass = '#success > .alert-success';
            text = "<strong>"+ successTextEnglish +"</strong>";
        }
        else{
            classList = "<div class='alert alert-danger'>";
            childClass = '#success > .alert-danger';
            text = "<strong>"+ errorText +"</strong>";
        }

        $('#success').html(classList);
        $(childClass).html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
            .append("</button>");
        $(childClass).append(text);
    }

    function removeAlert(){
        $('#success').html('');
    }

    function submitBook() {

        var bookname = $('#selectbook option:selected').text();
        var stream = $('input[name="stream"]:checked','#bookform').val();
        var price = $('#textprice').val();

        var bookJson = {
            "name": "phucgud",
            "type": "cse",
            "expectedRate": 78
        };


        $.ajax({
            url: "/books",
            type: "POST",
            data: JSON.stringify(bookJson),
            contentType: 'application/json; charset=UTF-8',
            success: function(response,status,xhr) {
                var res = JSON.parse(response);
                console.log(res);
                if(res){
                    showAlert(true);
                }
            },
            error: function() {
                showAlert(false);
            }
        });
    }

    var init = function(){
        $('#sub').on('click',function(){
            submitBook();
        });

    };


    return {
        init:init
    };
});