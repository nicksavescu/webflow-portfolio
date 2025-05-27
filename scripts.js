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

//Dark Mode
document.addEventListener("DOMContentLoaded", function () {
  const toggleButton = document.querySelector(".dark-mode");
  const lottie = document.querySelector("lottie-player");
  let isDarkMode = true;

  const variables = document.documentElement.style;

  const themes = {
    dark: {
      "--background": "#232323",
      "--text": "#f6f6f6",
      "--button-color": "#ef5225",
      "--highlight-color-orange": "#ef5225",
      "--highlight-color-purple": "#5c35c0",
    },
    light: {
      "--background": "#f6f6f6",
      "--text": "#363939",
      "--button-color": "#ef5225",
      "--highlight-color-orange": "#ef5225",
      "--highlight-color-purple": "#5c35c0",
    }
  };

  const moonFrame = 92.4;
  const sunFrame = 0;

  function applyTheme(themeName) {
    const theme = themes[themeName];
    for (let key in theme) {
      variables.setProperty(key, theme[key]);
    }
  }

  // Set initial theme and Lottie frame
  lottie.addEventListener("load", () => {
    applyTheme("dark");
    lottie.seek(moonFrame);
  });

  toggleButton.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    const themeToApply = isDarkMode ? "dark" : "light";
    applyTheme(themeToApply);

    if (isDarkMode) {
      lottie.playSegments([sunFrame, moonFrame], true);
    } else {
      lottie.playSegments([moonFrame, sunFrame], true);
    }
  });
});