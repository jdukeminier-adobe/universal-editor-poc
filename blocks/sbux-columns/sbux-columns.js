export default function decorate(block) {
  block.classList.add('sbux-columns');

  const cards = block.querySelectorAll('div[data-aue-component="card"]');
  cards.forEach((card, index) => {
    card.classList.add('sbux-column-card');

    // Optional alternating alignment
    if (index % 2 === 0) {
      card.classList.add('sbux-column-left');
    } else {
      card.classList.add('sbux-column-right');
    }

    // Find all "button" anchors inside this card
    const buttons = card.querySelectorAll('.button-container a.button');

    buttons.forEach((btn) => {
      const href = (btn.getAttribute('href') || '').trim();
      const text = (btn.textContent || '').trim();

      // Simple hex color detector: href like #006241, #fff, #FFFFFFFF, etc.
      const looksLikeColor = /^#[0-9A-Fa-f]{3,8}$/.test(href) ||
                             /^#[0-9A-Fa-f]{3,8}$/.test(text);

      if (looksLikeColor) {
        const color = href || text;

        // Apply background color to card
        card.style.backgroundColor = color;
        card.classList.add('has-bg-color');

        // Hide ONLY this button-container, not other buttons
        const buttonWrapper = btn.closest('.button-container');
        if (buttonWrapper) {
          buttonWrapper.classList.add('sbux-column-bgcolor-field');
        }
      }
      // If it's not a color, it's likely a real CTA (e.g., Learn more)
      // -> do nothing, leave it visible
    });

    // Background image overlay
    const img = card.querySelector('img[data-aue-prop="backgroundImage"]');
    if (img) {
      img.classList.add('sbux-column-bg-image');
    }

    // Text overlay
    const textWrapper = card.querySelector('div[data-aue-prop="text"]');
    if (textWrapper) {
      textWrapper.classList.add('sbux-column-content');
    }
  });
}