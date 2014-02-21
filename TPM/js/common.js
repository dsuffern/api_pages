$(document).ready(function () {
    var a = $(window).width();
    a >= 570 ? ($("div.accordionButton").click(function () {
        $("div.accordionContent").slideUp("normal"),
        $(this).next().slideDown("normal")
    }), $("div.accordionContent").hide()) : $(".accordionContent").show(), $(".iphonemenu").hide(), $("#menu-phone-button").click(function () {
        $(".iphonemenu").slideToggle(100)
    });
    $('a[href*=#]:not([href=#])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    }); 
}); 
var downloadLink = document.getElementById('register');
addListener(downloadLink, 'click', function() {
  ga('send', 'event', 'button', 'click', 'register');
});
var formSubmission = document.getElementById('submit-btn');
addListener(formSubmission, 'click', function() {
  ga('send', 'event', 'form-submission', 'submit', 'form');
});
function addListener(element, type, callback) {
 if (element.addEventListener) element.addEventListener(type, callback);
 else if (element.attachEvent) element.attachEvent('on' + type, callback);
}  