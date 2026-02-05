export default function decorate(block) {
  const items = window.getBlockItems ? window.getBlockItems(block) : [];
  if (!items.length) {
    return;
  }

  block.classList.add('sbux-columns');

  // Clear existing content so we fully control layout
  block.innerHTML = '';

  items.forEach((itemEl) => {
    const itemModel = window.getBlockModel && window.getBlockModel(itemEl);
    if (!itemModel) return;

    const col = document.createElement('div');
    col.classList.add('sbux-column');

    const inner = document.createElement('div');
    inner.classList.add('sbux-column-inner');

    const imgSrc = itemModel.backgroundImage?.src || itemModel.backgroundImage?.path;
    if (imgSrc) {
      inner.style.backgroundImage = `url("${imgSrc}")`;
      inner.classList.add('has-bg-image');
    }

    if (itemModel.backgroundColor) {
      inner.style.backgroundColor = itemModel.backgroundColor;
      inner.classList.add('has-bg-color');
    }

    const content = document.createElement('div');
    content.classList.add('sbux-column-content');

    if (itemModel.alignment) {
      content.classList.add(`align-${itemModel.alignment}`);
    }

    if (itemModel.content && itemModel.content.html) {
      content.innerHTML = itemModel.content.html;
    }

    inner.appendChild(content);
    col.appendChild(inner);
    block.appendChild(col);
  });
}

console.log('sbux-columns children', block.children);
console.log('sbux-columns model for first child', window.getBlockModel(block.children[0]));