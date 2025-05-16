export default function decorate(block) {
    const images = block.querySelectorAll('img');
    images.forEach((img) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'product-image';
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
    });
}
