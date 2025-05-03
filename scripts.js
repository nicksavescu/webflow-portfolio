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
  const $cards = $('.hover-card');
  let activeIndex = 0;

  function resetCards() {
    $cards.each(function (index) {
      const $card = $(this);
      gsap.to($card, { width: "30%", duration: 0.5, ease: "power2.out" });
      gsap.to($card.find('.card-text-active'), { opacity: 0, duration: 0.3 });
      gsap.to($card.find('.card-text-inactive'), { opacity: 1, duration: 0.3 });
    });
  }

  // Initial state
  const $initialCard = $cards.eq(activeIndex);
  gsap.set($initialCard, { width: "50%" });
  gsap.set($initialCard.find('.card-text-active'), { opacity: 1 });
  gsap.set($initialCard.find('.card-text-inactive'), { opacity: 0 });

  $cards.hover(
    function () {
      const index = $cards.index(this);
      resetCards();

      const $hovered = $(this);
      gsap.to($hovered, { width: "50%", duration: 0.5, ease: "power2.out" });
      gsap.to($hovered.find('.card-text-active'), { opacity: 1, duration: 0.3 });
      gsap.to($hovered.find('.card-text-inactive'), { opacity: 0, duration: 0.3 });

      activeIndex = index;
    },
    function () {
      resetCards();

      const $activeCard = $cards.eq(activeIndex);
      gsap.to($activeCard, { width: "50%", duration: 0.5, ease: "power2.out" });
      gsap.to($activeCard.find('.card-text-active'), { opacity: 1, duration: 0.3 });
      gsap.to($activeCard.find('.card-text-inactive'), { opacity: 0, duration: 0.3 });
    }
  );
});
