import data from './gallery-items.js';

const galleryRef = document.querySelector('.js-gallery');
const lightboxEl = document.querySelector('.js-lightbox');
const lightboxImage = document.querySelector('.lightbox__image');
const lightboxOverlay = document.querySelector('.lightbox__overlay');
const btnEl = document.querySelector('button[data-action="close-lightbox"]');

const cardsMarkup = createCardGallerMarkup(data);

function createCardGallerMarkup(arrGallery) {
  return arrGallery
    .map(({ preview, original, description }) => {
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

  if (!e.target.classList.contains('gallery__image')) {
    return;
  }
  lightboxEl.classList.add('is-open');
  const currentImgUrl = e.target.dataset.source;
  const currentImgAlt = e.target.alt;
  lightboxImage.src = currentImgUrl;
  lightboxImage.alt = currentImgAlt;
}

function closeModalOnBtn(e) {
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

function closeModalOnOverlay(e) {
  if (e.target.classList.contains('lightbox__image')) return;
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

function closeModalOnKey(e) {
  if (e.key !== 'Escape') return;
  lightboxEl.classList.remove('is-open');
  lightboxImage.src = '';
  lightboxImage.alt = '';
}

galleryRef.addEventListener('click', openModal);
btnEl.addEventListener('click', closeModalOnBtn);
lightboxOverlay.addEventListener('click', closeModalOnOverlay);
document.addEventListener('keydown', closeModalOnKey);
