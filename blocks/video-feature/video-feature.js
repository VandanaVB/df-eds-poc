export default function decorate(block) {
  // Create container
  const videoSection = document.createElement('section');
  videoSection.className = 'df-video-section';

  // Extract content
  const heading = block.querySelector('h2')?.textContent || 'Dive into your ultimate Fantasy!';

  // Get video URL and poster image
  const videoUrl = block.querySelector('a')?.href || '';
  const posterImage = block.querySelector('img')?.src || '';

  // Build HTML structure
  videoSection.innerHTML = `
    <h2 class="df-video-heading">${heading}</h2>

    <div class="df-video-container">
      <video class="df-video" controls poster="${posterImage}">
        <source src="${videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>

      <button class="df-video-play-btn">
        <span class="df-play-icon">▶</span>
      </button>
    </div>
  `;

  // Replace block content
  block.textContent = '';
  block.append(videoSection);

  // Initialize video functionality
  initVideo(videoSection);
}

function initVideo(section) {
  const video = section.querySelector('.df-video');
  const playBtn = section.querySelector('.df-video-play-btn');

  if (video && playBtn) {
    playBtn.addEventListener('click', () => {
      video.play();
      playBtn.style.display = 'none';
    });

    video.addEventListener('pause', () => {
      playBtn.style.display = 'flex';
    });

    video.addEventListener('play', () => {
      playBtn.style.display = 'none';
    });
  }
}
