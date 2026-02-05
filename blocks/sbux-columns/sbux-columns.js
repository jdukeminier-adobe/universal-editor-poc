export default function decorate(block) {
  // Try to get the model for this SBUX Columns block
  const data = window.getBlockModel && window.getBlockModel(block);
  if (!data || !Array.isArray(data.items)) {
    // Nothing to render
    return;
  }

  block.classList.add('sbux-columns');

  // Rebuild the inner content from the model
  block.innerHTML = '';

  data.items.forEach((item) => {
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

    if (item.content && item.content.html) {
      content.innerHTML = item.content.html;
    }

    inner.appendChild(content);
    col.appendChild(inner);
    block.appendChild(col);
  });

  console.log('SBUX model', data);
}