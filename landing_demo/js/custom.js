// Custom JS for the Theme

// Config 
//-------------------------------------------------------------

var countdownDate = "03/12/2014"; // Enter your countdown date

var locationTitle = "Master The Changes in DSM-5"; // Enter your event title
var locationAddress = "475 Seagate Drive, Naples, FL 34103 "; // Enter your event address

//var twitterWidgetId = "345650238654136320"; // Enter your twitter widgetId


// Preloader 
//-------------------------------------------------------------------------------

$(window).load(function(){

	$('#status').fadeOut(); 
	$('#preloader').delay(350).fadeOut('slow');
	$('body').delay(350).css({'overflow':'visible'});

	$('.event-info-bg-left').addClass('animated fadeInLeftBig delay1');
	$('.event-info-bg-right').addClass('animated fadeInRightBig delay1');
	$('.event-info').addClass('animated fadeIn delay2');

	$('img.img-fade').hide();

	function anim() {

		var fadeSpeed	= 1500;	// = 1.5 sec
		var displayTime	= 6000;	// = 8 sec

		$("#header-bg-fade img.img-fade").first().appendTo('#header-bg-fade').fadeOut(fadeSpeed);
		$("#header-bg-fade img").first().fadeIn(fadeSpeed);
		setTimeout(anim, displayTime);
	}

	anim();
});


// Placeholder Support for older browsers 
//-------------------------------------------------------------------------------
$('input, textarea').placeholder();


// Tooltip 
//-------------------------------------------------------------------------------
$(".my-tooltip").tooltip();


// Event Countdown  
//-------------------------------------------------------------------------------
$('.event-countdown').countdown(countdownDate, function(event) {
	$(this).html(event.strftime('only <span class="days">%D</span> days, <span class="hours">%H</span> hours, <span class="minutes">%M</span> minutes and <span class="seconds">%S</span> seconds left'));
});



// Navigation 
//-------------------------------------------------------------------------------

$(document).scroll(function () {
     var y = $(this).scrollTop();
     if (y > 580) {
         $('.navbar').fadeIn();
     } else {
         $('.navbar').fadeOut();
     }
 });

var navigation_links = $("nav li a");

navigation_links.click( function(event) {
  var position = $(this).attr('href');
  $('html, body').animate({ scrollTop: $(position).offset().top - 72}, 'slow', function(){
  });
  return false;
});



// Eventinfo Buttons 
//-------------------------------------------------------------------------------

var eventinfo_links = $(".event-info-nav-button");

eventinfo_links.click( function(event) {
  var link = $(this).find("a");
  var position = link.attr('href');
  $('html, body').animate({ scrollTop: $(position).offset().top - 73}, 'slow', function(){
  });
  return false;
});



// Register Button 
//-------------------------------------------------------------------------------

var register_button = $(".event-info-register-btn");

register_button.click( function(event) {
  var link = $(this);
  var position = link.attr('href');
  $('html, body').animate({ scrollTop: $(position).offset().top - 73}, 'slow', function(){
  });
  return false;
});



// Scroll to Top Button
//-------------------------------------------------------------------------------

  $(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
      $('.scrollup').removeClass("animated fadeOutRight");
      $('.scrollup').fadeIn().addClass("animated fadeInRight");
      } else {
      $('.scrollup').removeClass("animated fadeInRight");
      $('.scrollup').fadeOut().addClass("animated fadeOutRight");
    }
  });
  
  $('.scrollup, .navbar-brand').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 'slow', function(){
      $("nav li a").removeClass('active');
    });
    return false;
  });



// Speakers
//-------------------------------------------------------------------------------
$(".speaker").mouseover(function(){
  $(this).addClass("active");
});

$(".speaker").mouseout(function(){
  $(this).removeClass("active");
});


// Location Map 
//-------------------------------------------------------------------------------

var locationContent =     "<h2>"+locationTitle+"</h2>"
                         +"<p>"+locationAddress+"</p>";

$("#location-map").height("550px").gmap3({
	map: {
		options: {
			maxZoom: 16,
      scrollwheel: false
		}  
	},
	infowindow:{
     address: locationAddress,
     options:{
       content: locationContent
     }
  },
  marker:{
    address: locationAddress,
    options: {
     icon: new google.maps.MarkerImage(
       "/img/map-icon.png",
       new google.maps.Size(34, 34, "px", "px"), 
       new google.maps.Point(0, 0),    //sets the origin point of the icon
       new google.maps.Point(16, 18)   //sets the anchor point for the icon
     
     )
    }
 }
}, "autofit");



// Form Validator
//-------------------------------------------------------------------------------

function validateEmail(email){
  var emailReg = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z0-9.-]{2,4}$/;
  if (!emailReg.test(email.val()))
  {
    email.addClass('validation-error',500);
    return false;
  }
  else
  {
    email.removeClass('validation-error',500);
    return true;
  }
}

function validateNotEmpty(field){
  if (field.val()=='')
  {
    field.addClass('validation-error',500);
    return false;
  }
  else
  {
    field.removeClass('validation-error',500);
    return true;
  }
}


// Newsletter Form 
//-------------------------------------------------------------------------------

$("#submit-newsletter").on("click", function(){

  $("#submit-newsletter").button('loading');

  var result = true;
  var email = $('#newsletter form input[name=email]');
  if(!validateEmail(email)){result=false;}
  if(result==false){
    $("#submit-newsletter").button('reset');
    return false;
  }

  var formData = $("#newsletter form").serialize();

  // Send the Form
  $.ajax({
        //this is the php file that processes the data and send mail
        url: "submit-forms.php", 
        //POST method is used
        type: "POST",
        //pass the data     
        data: formData,
        //Do not cache the page
        cache: false,
        //success
        success: function(data) {
          $("#newsletter form").html("<h3>Thanks for Signing Up!</h3>");
        }
      });

  return false;

  console.log(email);

  
});



// Register Form 
//-------------------------------------------------------------------------------

$(".plan").on("click", function(){

  $(".plan").removeClass("active");
  $(".checkbox i").removeClass("fa-check-square-o");
  $(".checkbox i").addClass("fa-square-o");
  $("input[name=plan]").removeAttr("value");

  $(this).toggleClass("active");
  $(this).find(".checkbox i").toggleClass("fa-check-square-o fa-square-o");
  var plan = $(this).find(".offer h4").text();
  $("input[name=plan]").attr('value', plan);
});

$("#register input").on("focus", function(){
  $(this).addClass("active");
});

$("#register input").on("focusout", function(){
  $("#register input").removeClass("active");
});


$("#submit-registration").on("click", function(){
  
  $("#submit-registration").button('loading');

  var result = true;

  var first_name = $('#register input[name=first_name]');
  var last_name = $('#register input[name=last_name]');
  var email = $('#register input[name=email]');
  var address = $('#register input[name=address]');
  var zip_code = $('#register input[name=zip_code]');
  var city = $('#register input[name=city]');
  var plan = $('#register input[name=plan]');


  // validate of name input
  if(!validateNotEmpty(first_name)){result=false;}
  if(!validateNotEmpty(last_name)){result=false;}
  if(!validateNotEmpty(address)){result=false;}
  if(!validateNotEmpty(zip_code)){result=false;}
  if(!validateNotEmpty(city)){result=false;}
  if(!validateEmail(email)){result=false;}

  if(!validateNotEmpty(plan))
  {
    $("div .plan").addClass("validation-error");
    result=false;
  }
  else
  {
    $("div .plan").removeClass("validation-error");
  }

  if(result==false)
  {
    $("#submit-registration").button('reset');
    $("#register .validation-error-msg").show();
    return false;
  }
  else
  {
    $("#register .validation-error-msg").hide();
  }


  var formData = $("#register form").serialize();

  // Send the Form
  $.ajax({
        //this is the php file that processes the data and send mail
        url: "submit-forms.php", 
        //POST method is used
        type: "POST",
        //pass the data     
        data: formData,
        //Do not cache the page
        cache: false,
        //success
        success: function(data) {
          $("#submit-registration").button('complete');
          $('.registration-success-msg').fadeIn("slow");
        }
      });
// function fadeTweets(tweets) {

//   var x = tweets.length;
//   var n = 0;
//   var element = document.getElementById('tweets');
//   var html = '<ul>';
//   while(n < x) {
//     html += '<li>' + tweets[n] + '</li>';
//     n++;
//   }
//   html += '</ul>';
//   element.innerHTML = html;

//   var list_slideshow = $("#tweets ul"),
//   listItems = list_slideshow.children('li'),
//   listLen = listItems.length,
//   i = 0,
//   changeList = function () {
//     listItems.eq(i).fadeOut(1000, function () {
//       i += 1;
//       if (i === listLen) {
//         i = 0;
//       }
//       listItems.eq(i).fadeIn(1000);
//     });
//   };
//   listItems.not(':first').hide();
//   setInterval(changeList, 5000);

//   //console.log(tweets);
// }

// twitterFetcher.fetch(twitterWidgetId, 'tweets', 5, true, false, false, 'default', false, fadeTweets);

  return false;

});



// Last Tweets
//-------------------------------------------------------------------------------


