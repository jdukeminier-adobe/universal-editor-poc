export default function decorate(block) {
  const data = window.getBlockModel && window.getBlockModel(block);
  if (!data || !Array.isArray(data.items)) {
    return;
  }

  block.classList.add('sbux-columns');
  block.innerHTML = '';

  data.items.forEach((item, index) => {
    const col = document.createElement('div');
    col.classList.add('sbux-column');

    // Alternating pattern: even index left, odd index right
    // (or apply row-wise logic if you want 2-per-row strictly)
    if (index % 2 === 0) {
      col.classList.add('sbux-column-left');
    } else {
      col.classList.add('sbux-column-right');
    }

    const inner = document.createElement('div');
    inner.classList.add('sbux-column-inner');

    const imgSrc =
      (item.backgroundImage && (item.backgroundImage.src || item.backgroundImage.path)) ||
      null;
    if (imgSrc) {
      inner.style.backgroundImage = `url("${imgSrc}")`;
      inner.classList.add('has-bg-image');
    }

    if (item.backgroundColor) {
      inner.style.backgroundColor = item.backgroundColor;
      inner.classList.add('has-bg-color');
    }

    const content = document.createElement('div');
    content.classList.add('sbux-column-content');

    if (item.content && item.content.html) {
      content.innerHTML = item.content.html;
    }

    inner.appendChild(content);
    col.appendChild(inner);
    block.appendChild(col);
  });
}