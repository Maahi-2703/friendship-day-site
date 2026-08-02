const pages = [...document.querySelectorAll('.page')];
const dots = [...document.querySelectorAll('.progress i')];
const memoryTabs = [...document.querySelectorAll('.memory-tab')];
const memoryPhotos = [...document.querySelectorAll('.memory-grid img')];
const memoryLabel = document.getElementById('memorySearchLabel');
const memoryGrid = document.querySelector('.memory-grid');
const perMemoryPage = 6;
let currentCategory = 'all';
let memoryPage = 0;

function rotateImageLeft(image) {
  const source = image.currentSrc || image.src;
  const rotation = new Image();
  rotation.onload = () => {
    const canvas = document.createElement('canvas');
    canvas.width = rotation.naturalHeight;
    canvas.height = rotation.naturalWidth;
    const context = canvas.getContext('2d');
    context.translate(0, canvas.height);
    context.rotate(-Math.PI / 2);
    context.drawImage(rotation, 0, 0);
    image.src = canvas.toDataURL('image/jpeg', 0.92);
  };
  rotation.src = source;
}

const sidewaysMemory = document.querySelector('.memory-grid img[src$="Snapchat-116618493.jpg"]');
if (sidewaysMemory) rotateImageLeft(sidewaysMemory);

const memoryPager = document.createElement('div');
memoryPager.className = 'memory-pager';
memoryPager.innerHTML = '<button type="button" class="pager-button" aria-label="Previous photos">←</button><span></span><button type="button" class="pager-button" aria-label="Next photos">→</button>';
memoryGrid.insertAdjacentElement('afterend', memoryPager);

function showPage(index) {
  pages.forEach((page, i) => page.classList.toggle('active', i === index));
  dots.forEach((dot, i) => dot.classList.toggle('on', i === index));
}

function renderMemories() {
  const visiblePhotos = memoryPhotos.filter(photo => currentCategory === 'all' || photo.dataset.category === currentCategory);
  const totalPages = Math.ceil(visiblePhotos.length / perMemoryPage);
  memoryPage = Math.min(memoryPage, Math.max(totalPages - 1, 0));
  const first = memoryPage * perMemoryPage;

  memoryPhotos.forEach(photo => photo.classList.add('hidden'));
  visiblePhotos.slice(first, first + perMemoryPage).forEach(photo => photo.classList.remove('hidden'));

  memoryPager.querySelector('span').textContent = totalPages > 1 ? `${memoryPage + 1} / ${totalPages}` : `${visiblePhotos.length} photos`;
  const buttons = memoryPager.querySelectorAll('button');
  buttons[0].disabled = memoryPage === 0;
  buttons[1].disabled = memoryPage >= totalPages - 1;
  memoryPager.classList.toggle('single-page', totalPages <= 1);
}

function filterMemories(category) {
  currentCategory = category;
  memoryPage = 0;
  memoryTabs.forEach(tab => {
    const active = tab.dataset.filter === category;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', active);
  });
  memoryLabel.textContent = category === 'all' ? 'Moments of us ♡' : category[0].toUpperCase() + category.slice(1) + ' of us ♡';
  renderMemories();
}

document.querySelectorAll('.next,.restart').forEach(button => button.addEventListener('click', () => showPage(Number(button.dataset.next))));
document.getElementById('awardBtn').addEventListener('click', () => document.querySelector('.award').classList.add('revealed'));
memoryTabs.forEach(tab => tab.addEventListener('click', () => filterMemories(tab.dataset.filter)));
memoryPager.querySelectorAll('button').forEach((button, index) => button.addEventListener('click', () => {
  memoryPage += index === 0 ? -1 : 1;
  renderMemories();
}));
document.getElementById('whatsappBtn').addEventListener('click', () => {
  const message = encodeURIComponent('Happy Friendship Day! I made this little scrapbook for you.\n\n' + location.href);
  window.open('https://wa.me/?text=' + message, '_blank');
});
filterMemories('all');
showPage(0);
