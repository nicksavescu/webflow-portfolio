//Rotating Words Headline
  document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.rotate-words');

    elements.forEach((el) => {
      const words = el.dataset.rotateWords.split(',');
      let index = 0;
      let currentText = '';
      let isDeleting = false;

      function type() {
        const fullText = words[index];

        if (isDeleting) {
          currentText = fullText.substring(0, currentText.length - 1);
        } else {
          currentText = fullText.substring(0, currentText.length + 1);
        }

        el.textContent = currentText;

        let delay = isDeleting ? 50 : 100;

        if (!isDeleting && currentText === fullText) {
          delay = 1500; // Pause when word is fully typed
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
