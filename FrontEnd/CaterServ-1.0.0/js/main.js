(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);
    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Testimonial carousel
    $(".testimonial-carousel-1").owlCarousel({
        loop: true,
        dots: false,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

    $(".testimonial-carousel-2").owlCarousel({
        loop: true,
        dots: false,
        rtl: true,
        margin: 25,
        autoplay: true,
        slideTransition: 'linear',
        autoplayTimeout: 0,
        autoplaySpeed: 10000,
        autoplayHoverPause: false,
        responsive: {
            0:{
                items:1
            },
            575:{
                items:1
            },
            767:{
                items:2
            },
            991:{
                items:3
            }
        }
    });

})(jQuery);

window.onload = function() {
    // Check if user is logged in
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'Super') {
        document.getElementById("profileSuperAdminLink").style.display = "inline-block";
        document.getElementById("logoutLink").style.display = "inline-block";
        document.getElementById("Login").style.display = "none";

    }
    else if (isLoggedIn === 'Admin') {
        document.getElementById("profileAdminLink").style.display = "inline-block";
        document.getElementById("logoutLink").style.display = "inline-block";
        document.getElementById("Login").style.display = "none";

    }
    else if (isLoggedIn === 'User')
    {
        document.getElementById("profileUserLink").style.display = "inline";
        document.getElementById("logoutLink").style.display = "inline-block";
        document.getElementById("Login").style.display = "none";

    }
};

function logoutUser() {
    localStorage.removeItem('isLoggedIn');
    // Optionally, redirect to the login page
    window.location.href = 'index.html';
}

async function SendMessage(){
    const messageSendURL = 'https://localhost:44397/api/ContactUs';
    event.preventDefault();
    var form = document.getElementById("ContactForm");
    var fromSwagger = new FormData(form);
    let response = await fetch(messageSendURL, {
        method: 'POST',
        body: fromSwagger,
    });
    alert("شكرا لك على تواصلك معنا تم ارسال  رسالتك بنجاح")
}