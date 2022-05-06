const content = document.getElementById("#content");

const animateAvailability = (el, rate = 10) => {
  // Calculate how far to scroll.
  // Scroll twice the distance for seamless restart (both sides are padded).
  const width = el.offsetWidth;
  const dX = 2 * width;

  // Contain the animation in the container.
  const parent = el.parentElement;
  parent.style.maxWidth = `${width}px`;

  // Pad the scrolling content (content x4).
  for (let i = 0; i < 2; ++i) content.innerHTML += content.innerHTML;

  // Calculate the rate of motion. Use it to avoid the "cut" on animation restart.
  const smoothRate = rate / (dX - width) * 100;

  const tween = gsap.fromTo(content, {
      // Pad the left.
      x: -width
    },
    {
      x: -dX - smoothRate,
      duration: rate,
      ease: "none",
      repeat: -1,
      paused: true
    });

  // Prevent the left side from showing up when the animation starts.
  const leftPaddingEl = el.firstElementChild;
  leftPaddingEl.style.opacity = "0";
  // Make it visible again for future iterations.
  setTimeout(() => leftPaddingEl.style.opacity = "", 2000);

  // Comment this out to see how the timeout works.
  tween.play();
}

// Start the loop.
animateAvailability(content, 15);