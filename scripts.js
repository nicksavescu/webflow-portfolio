//Navbar Show/Hide
$(document).ready(function () {
    let lastScrollTop = 0;
    const $navbar = $('.Navbar');
    const frostyClass = 'nav-frosty';
    const hiddenClass = 'nav-hidden';

    $(window).on('scroll', function () {
      const scrollTop = $(this).scrollTop();

      // Add or remove frosty look
      if (scrollTop > 50) {
        $navbar.addClass(frostyClass);
      } else {
        $navbar.removeClass(frostyClass);
      }

      // Hide on scroll down, show on scroll up
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        $navbar.addClass(hiddenClass);
      } else {
        $navbar.removeClass(hiddenClass);
      }

      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  });

//Rotating Words Headline
$(document).ready(function () {
    $('.rotate-words').each(function () {
      const words = $(this).data('rotate-words').split(',');
      let index = 0;
      const $el = $(this);
      let currentText = '';
      let isDeleting = false;

      function type() {
        const fullText = words[index];
        
        if (isDeleting) {
          currentText = fullText.substring(0, currentText.length - 1);
        } else {
          currentText = fullText.substring(0, currentText.length + 1);
        }

        $el.text(currentText);

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && currentText === fullText) {
          delay = 1500; // Pause at full word
          isDeleting = true;
        } else if (isDeleting && currentText === '') {
          isDeleting = false;
          index = (index + 1) % words.length;
          delay = 300;
        }

        setTimeout(type, delay);
      }

      type();
    });
  });


//Cards Hover
$(document).ready(function() {
    function initializeCardHover() {
        if ($(window).width() >= 1000) {
            $('#text2, #text3, #text4').hide();
            $('#inner1').hide(); 
            $('#text1').show(); 
            let activeCard = '#card1'; 
            $(activeCard).css('width', '40%');
            function resetCards() {
                $('#Card1, #Card2, #Card3, #Card4').css('width', '20%'); 
                $('#inner1, #inner2, #inner3, #inner4').show(); 
                $('#text1, #text2, #text3, #text4').hide(); 
            }
            $('#Card1, #Card2, #Card3, #Card4, #Card5, #Card6').hover(
                function() {
                    var cardId = $(this).attr('id');
                    resetCards();
                    $(this).css('width', '40%');
                    $('#inner' + cardId.slice(-1)).hide();
                    $('#text' + cardId.slice(-1)).show();
                    activeCard = '#' + cardId;
                }, 
                function() {
                    resetCards(); 
                    $(activeCard).css('width', '40%');
                    $('#inner' + activeCard.slice(-1)).hide(); 
                    $('#text' + activeCard.slice(-1)).show(); 
                }
            );
        }
    }
    initializeCardHover();
    $(window).resize(function() {
        initializeCardHover();
    });
});
