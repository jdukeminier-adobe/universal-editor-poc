export default function decorate(block) {
  block.classList.add('sbux-columns');

  const cards = block.querySelectorAll('div[data-aue-component="card"]');
  cards.forEach((card, index) => {
    card.classList.add('sbux-column-card');

    // Alternating alignment (optional)
    if (index % 2 === 0) {
      card.classList.add('sbux-column-left');
    } else {
      card.classList.add('sbux-column-right');
    }

    // Get the model for this card, if available
    const model =
      (window.getBlockModel && window.getBlockModel(card)) || null;

    if (model && model.backgroundColor) {
      // Apply backgroundColor as inline style on the card
      card.style.backgroundColor = model.backgroundColor;
      card.classList.add('has-bg-color');
    }

    // Ensure background image is treated as overlay
    const img = card.querySelector('img[data-aue-prop="backgroundImage"]');
    if (img) {
      img.classList.add('sbux-column-bg-image');
    }

    // Mark the text wrapper so we can style as overlay content
    const textWrapper = card.querySelector('div[data-aue-prop="text"]');
    if (textWrapper) {
      textWrapper.classList.add('sbux-column-content');
    }

    // Hide any visible element UE renders for backgroundColor
    const bgColorField = card.querySelector(
      '[data-aue-prop="backgroundColor"]'
    );
    if (bgColorField) {
      bgColorField.classList.add('sbux-column-bgcolor-field');
    }
  });
}