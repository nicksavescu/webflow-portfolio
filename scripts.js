//Navbar Show/Hide
$(document).ready(function () {
    let lastScrollTop = 0;
    const $navbar = $('.navbar'); // Replace '.navbar' with your actual navbar selector
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
$(document).ready(function () {
  function initializeCardHover() {
    if ($(window).width() >= 1000) {
      $('.Card-text-active').removeClass('show');
      $('.Inner-wrapper-hc').addClass('show');
      let activeCard = '#card1';

      gsap.to(activeCard, { width: '40%', duration: 0.5, ease: 'power2.out' });

      function resetCards() {
        gsap.to(['#card1', '#card2', '#card3', '#card4'], {
          width: '20%',
          duration: 0.5,
          ease: 'power2.out',
        });
        $('.Inner-wrapper-hc').addClass('show');
        $('.Card-text-active').removeClass('show');
      }

      $('#card1, #card2, #card3, #card4').hover(
        function () {
          const cardId = $(this).attr('id');
          resetCards();
          gsap.to('#' + cardId, {
            width: '40%',
            duration: 0.5,
            ease: 'power2.out',
          });
          $('#inner' + cardId.slice(-1)).removeClass('show');
          $('#text' + cardId.slice(-1)).addClass('show');
          activeCard = '#' + cardId;
        },
        function () {
          resetCards();
          gsap.to(activeCard, {
            width: '40%',
            duration: 0.5,
            ease: 'power2.out',
          });
          $('#inner' + activeCard.slice(-1)).removeClass('show');
          $('#text' + activeCard.slice(-1)).addClass('show');
        }
      );
    }
  }

  initializeCardHover();
  $(window).resize(function () {
    initializeCardHover();
  });
});
