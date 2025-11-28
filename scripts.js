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

//Leafs & Light
document.addEventListener('DOMContentLoaded', function () {
  const wrapper = document.querySelector('.light-area'); // now using .light-area
  const blob = wrapper ? wrapper.querySelector('.light-blob') : null;
  const template = wrapper ? wrapper.querySelector('.leaf-template') : null;

  if (!wrapper || !blob || !template) return;

  const TOTAL_LEAVES = 10; // how many leaves total
  const leaves = [];

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  // 1) Clone the template into .leaf elements
  for (let i = 0; i < TOTAL_LEAVES; i++) {
    const clone = template.cloneNode(true);
    clone.classList.remove('leaf-template');
    clone.classList.add('leaf');
    wrapper.appendChild(clone);
    leaves.push(clone);
  }

  // Hide original template (we only use it as a source)
  template.style.opacity = '0';
  template.style.pointerEvents = 'none';

  // 2) Layout: scatter leaves along LEFT and RIGHT edges
  function layoutLeaves() {
    const rect = wrapper.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    const topPadding = h * 0.05;       // 5% from top
    const bottomPadding = h * 0.05;    // 5% from bottom

    // You wanted them "more hidden than -8vw" and then reaching up to about -7 / -5 vw.
    // We'll approximate using the container width (w):
    const leftHiddenX = -0.14 * w;      // ~ -14vw (more hidden)
    const leftMaxVisibleX = -0.06 * w;  // ~ -6vw (don't go further in than this)

    // Same idea on the right, mirrored outside the container:
    const rightHiddenX = w + 0.14 * w;      // off to the right
    const rightMaxVisibleX = w + 0.06 * w;  // visible edge limit

    const half = Math.ceil(TOTAL_LEAVES / 2);
    const leftLeaves = leaves.slice(0, half);
    const rightLeaves = leaves.slice(half);

    function setupSide(sideLeaves, isLeft) {
      // Create vertical positions, then sort them so we can alternate colors nicely
      const positions = sideLeaves
        .map(() => randomBetween(topPadding, h - bottomPadding))
        .sort((a, b) => a - b);

      sideLeaves.forEach((leaf, index) => {
        const baseY = positions[index] + randomBetween(-10, 10); // small jitter

        const baseXHidden = isLeft ? leftHiddenX : rightHiddenX;
        const maxVisibleX = isLeft ? leftMaxVisibleX : rightMaxVisibleX;

        // Store base data for later use when the mouse moves
        leaf.dataset.baseXHidden = baseXHidden;
        leaf.dataset.maxVisibleX = maxVisibleX;
        leaf.dataset.baseY = baseY;
        leaf.dataset.side = isLeft ? 'left' : 'right';

        // Random base rotation & scale
        const baseRot = randomBetween(-25, 25);       // degrees
        const baseScale = randomBetween(0.85, 1.25);  // size

        leaf.dataset.baseRot = baseRot;
        leaf.dataset.baseScale = baseScale;

        // Alternate colors so neighbors on the same side don't match
        const isPeach = index % 2 === 0;
        leaf.classList.toggle('leaf--peach', isPeach);
        leaf.classList.toggle('leaf--purple', !isPeach);

        // Initial transform: hidden position off the edge
        leaf.style.transform =
          `translate(${baseXHidden}px, ${baseY}px) rotate(${baseRot}deg) scale(${baseScale})`;
      });
    }

    setupSide(leftLeaves, true);
    setupSide(rightLeaves, false);
  }

  layoutLeaves();
  window.addEventListener('resize', layoutLeaves);

  // 3) Mouse move: move blob + make nearby leaves reach for the pointer
  document.addEventListener('mousemove', function (e) {
    const rect = wrapper.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Move light blob with the pointer
    blob.style.transform =
      `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;

    const maxEffectDist = 250; // px – radius of the "aura" that wakes the leaves

    leaves.forEach(leaf => {
      const side = leaf.dataset.side;
      const baseXHidden = parseFloat(leaf.dataset.baseXHidden);
      const maxVisibleX = parseFloat(leaf.dataset.maxVisibleX);
      const baseY = parseFloat(leaf.dataset.baseY);
      const baseRot = parseFloat(leaf.dataset.baseRot);
      const baseScale = parseFloat(leaf.dataset.baseScale);

      // Distance from mouse to that side + leaf's Y
      const distX = side === 'left'
        ? mouseX   // distance from left edge
        : (rect.width - mouseX); // distance from right edge

      const dy = mouseY - baseY;
      const dist = Math.sqrt(distX * distX + dy * dy);

      // t = 0 (far) → 1 (very close)
      const t = Math.max(0, 1 - dist / maxEffectDist);

      // Horizontal movement: interpolate between hidden and max visible
      const x = baseXHidden + (maxVisibleX - baseXHidden) * t;

      // Vertical drift slightly toward the pointer
      const offsetY = dy * 0.15 * t;
      const y = baseY + offsetY;

      // Slight extra scale & inward tilt as they reach
      const scale = baseScale * (1 + 0.18 * t);
      const extraTilt = side === 'left' ? 8 : -8;
      const rot = baseRot + extraTilt * t;

      leaf.style.transform =
        `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
    });
  });
});