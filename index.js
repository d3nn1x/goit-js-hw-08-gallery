import data from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const btnEl = document.querySelector('button[data-action="close-lightbox"]');

let currentIndex;

const cardsMarkup = createCardGallerMarkup(data);

function createCardGallerMarkup(arrGallery) {
  return arrGallery
    .map(({ preview, original, description }, i) => {
      return `
    <li class="gallery__item">
    <a
    class="gallery__link"
    href="${original}"
    >
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    data-index=${i}
    alt="${description}"
    />
    </a>
    </li>
    `;
    })
    .join('');
}

galleryRef.insertAdjacentHTML('beforeend', cardsMarkup);

function openModal(e) {
  e.preventDefault();
  currentIndex = +e.target.dataset.index;

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxEl.classList.add('is-open');
  let currentImgUrl = e.target.dataset.source;
  let currentImgAlt = e.target.alt;
  lightboxImage.src = currentImgUrl;
  lightboxImage.alt = currentImgAlt;
  document.addEventListener('keydown', closeModalOnKey);
  document.addEventListener('keydown', onArrowPress);
}

function closeModalOnBtn() {
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
  document.removeEventListener('keydown', closeModalOnKey);
  document.removeEventListener('keydown', onArrowPress);
}

function closeModalOnOverlay(e) {
  if (e.target.classList.contains('lightbox__image')) return;
  closeModalOnBtn();
}

function closeModalOnKey(e) {
  if (e.key !== 'Escape') return;
  closeModalOnBtn();
}

galleryRef.addEventListener('click', openModal);
btnEl.addEventListener('click', closeModalOnBtn);
lightboxOverlay.addEventListener('click', closeModalOnOverlay);

function forward() {
  lightboxImage.src = data[currentIndex + 1].original;
  currentIndex++;
}
function back() {
  lightboxImage.src = data[currentIndex - 1].original;
  currentIndex--;
}

function onArrowPress(e) {
  if (e.key === 'ArrowLeft') {
    back();
  }
  if (e.key === 'ArrowRight') {
    forward();
  }
}
