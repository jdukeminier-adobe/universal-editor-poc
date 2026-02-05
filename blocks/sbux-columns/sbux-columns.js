export default function decorate(block) {
  // Assuming the Universal Editor writes JSON into data attributes
  // or you fetch JSON via a model endpoint; adjust according to your setup.
  const data = window.getBlockModel && window.getBlockModel(block);
  if (!data || !Array.isArray(data.items)) {
    return;
  }

  block.classList.add('sbux-columns');

  data.items.forEach((item) => {
    const col = document.createElement('div');
    col.classList.add('sbux-column');

    // base overlay wrapper
    const inner = document.createElement('div');
    inner.classList.add('sbux-column-inner');

    // background via inline style; you can also use CSS vars instead
    if (item.backgroundImage?.src) {
      inner.style.backgroundImage = `url("${item.backgroundImage.src}")`;
      inner.classList.add('has-bg-image');
    }
    if (item.backgroundColor) {
      inner.style.backgroundColor = item.backgroundColor;
      inner.classList.add('has-bg-color');
    }

    // content wrapper
    const content = document.createElement('div');
    content.classList.add('sbux-column-content');

    if (item.alignment) {
      content.classList.add(`align-${item.alignment}`);
    }

    // Inject rich text; make sure the HTML you trust is what UE outputs
    if (item.content && item.content.html) {
      content.innerHTML = item.content.html;
    }

    inner.appendChild(content);
    col.appendChild(inner);
    block.appendChild(col);
  });
}
