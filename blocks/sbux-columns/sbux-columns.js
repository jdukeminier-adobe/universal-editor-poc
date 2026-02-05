export default function decorate(block) {
  // Take a snapshot of current children; each should correspond to one SBUX Column item.
  const itemElements = Array.from(block.children || []);

  block.classList.add('sbux-columns');

  // We will rebuild the inside of the block with our own markup
  block.innerHTML = '';

  itemElements.forEach((itemEl) => {
    // Get the model for this child item (SBUX Column)
    const item =
      (window.getBlockModel && window.getBlockModel(itemEl)) || null;

    if (!item) {
      // If no model is found, skip this item
      return;
    }

    const col = document.createElement('div');
    col.classList.add('sbux-column');

    const inner = document.createElement('div');
    inner.classList.add('sbux-column-inner');

    // Background image
    const imgSrc =
      (item.backgroundImage && (item.backgroundImage.src || item.backgroundImage.path)) ||
      null;
    if (imgSrc) {
      inner.style.backgroundImage = `url("${imgSrc}")`;
      inner.classList.add('has-bg-image');
    }

    // Background color
    if (item.backgroundColor) {
      inner.style.backgroundColor = item.backgroundColor;
      inner.classList.add('has-bg-color');
    }

    // Content wrapper
    const content = document.createElement('div');
    content.classList.add('sbux-column-content');

    if (item.alignment) {
      content.classList.add(`align-${item.alignment}`);
    }

    // Rich text content
    if (item.content && item.content.html) {
      content.innerHTML = item.content.html;
    }

    inner.appendChild(content);
    col.appendChild(inner);
    block.appendChild(col);
  });
}