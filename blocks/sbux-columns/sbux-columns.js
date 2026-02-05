export default function decorate(block) {
  // Mark the block as an SBUX Columns container
  block.classList.add('sbux-columns');

  // All direct child cards act as column items
  const cards = block.querySelectorAll('div[data-aue-component="card"]');
  cards.forEach((card, index) => {
    card.classList.add('sbux-column-card');

    // Optional: alternating alignment class, if you want
    if (index % 2 === 0) {
      card.classList.add('sbux-column-left');
    } else {
      card.classList.add('sbux-column-right');
    }

    // Set the background color if present
    const bgColor = card.querySelector('div[data-aue-prop="backgroundColor"]');
    if (bgColor) {
      card.style.backgroundColor = bgColor;
    }

    // Ensure the image is usable as a background overlay
    const img = card.querySelector('img[data-aue-prop="backgroundImage"]');
    if (img) {
      img.classList.add('sbux-column-bg-image');
    }

    // Mark the text wrapper so we can style it as overlay content
    const textWrapper = card.querySelector('div[data-aue-prop="text"]');
    if (textWrapper) {
      textWrapper.classList.add('sbux-column-content');
    }
  });
}