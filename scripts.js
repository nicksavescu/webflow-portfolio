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
      const $cards = $('.hover-card');

      // Set initial active card
      let activeIndex = 0;

      function resetCards() {
        $cards.css('width', '20%');
        $cards.each(function () {
          $(this).find('.card-text-inactive').show();
          $(this).find('.card-text-active').hide();
        });
      }

      // Set initial state
      resetCards();
      $cards.eq(activeIndex).css('width', '40%');
      $cards.eq(activeIndex).find('.card-text-inactive').hide();
      $cards.eq(activeIndex).find('.card-text-active').show();

      $cards.hover(
        function () {
          const index = $cards.index(this);
          resetCards();
          $(this).css('width', '40%');
          $(this).find('.card-text-inactive').hide();
          $(this).find('.card-text-active').show();
          activeIndex = index;
        },
        function () {
          resetCards();
          $cards.eq(activeIndex).css('width', '40%');
          $cards.eq(activeIndex).find('.card-text-inactive').hide();
          $cards.eq(activeIndex).find('.card-text-active').show();
        }
      );
    }
  }

  initializeCardHover();
  $(window).resize(function () {
    initializeCardHover();
  });
});
