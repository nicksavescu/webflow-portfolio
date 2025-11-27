//Rotating Words Headline
$(document).ready(function () {
  $(".dynamic-words").each(function () {
    const words = $(this).data("dynamic-words").split(",");
    let index = 0;
    const $el = $(this);
    let currentText = "";
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
      } else if (isDeleting && currentText === "") {
        isDeleting = false;
        index = (index + 1) % words.length;
        delay = 300;
      }

      setTimeout(type, delay);
    }

    type();
  });
});

//Navbar
window.addEventListener('scroll', () => {
  const navFrosty = document.querySelector('.nav-frosty');
  if (!navFrosty) return;

  if (window.scrollY > 80) {
    navFrosty.classList.add('is-frosty');
  } else {
    navFrosty.classList.remove('is-frosty');
  }
});

//Light Follows Mouse
document.addEventListener('DOMContentLoaded', function () {
    const wrapper = document.querySelector('.light-area-wrapper');
    const blob = document.querySelector('.light-blob');
    if (!wrapper || !blob) return;

    document.addEventListener('mousemove', function (e) {
      const rect = wrapper.getBoundingClientRect();

      // Mouse position relative to the wrapper
      let x = e.clientX;
      let y = e.clientY - rect.top;

      // Clamp Y so it stays inside the wrapper vertically
      y = Math.max(0, Math.min(rect.height, y));

      blob.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });
  });
