$(document).ready(function() {

$('.error').hide();
$("#contact_finish").hide();
$("#submit_btn").click(function(event) {

    $('.error').hide();
    var isError = false;

    var firstname = $("#firstname").val();
    if (firstname == "") {
        isError = true;
        $("#firstname_error").show();
        $("#firstname").focus();
        event.preventDefault();
    }
    var lastname = $("#lastname").val();
    if (lastname == "") {
        isError = true;
        $("#lastname_error").show();
        $("#lastname").focus();
        event.preventDefault();
    }
    var email = $("#email").val();
    if (email == "") {
        isError = true;
        $("#email_error").show();
        $("#email").focus();
        event.preventDefault();
    }

    if (isError == true) {
        return false;
    }

    // var item = '429';
    // var item = '340';
    // var code = 'MKT-CAR-vEA';
    var dataString = 'item=' + item + '&code=' + code + '&firstname=' + firstname + '&lastname=' + lastname + '&email=' + email;
    //alert(dataString);
    $.ajax({
        type: "POST",
        url: "http://americanphysicianlogin.com/Contact/MailApir.aspx",
        data: dataString,
        dataType: "jsonp",
        success: postSuccess(),
        error: postError()
    });

    function postSuccess(data) {
        //alert('success');z
    }

    function postError(data) {
        //alert('error');
    }

    $("#contact_form").hide();
    $("#contact_finish").show();
    return false;
});
});