'use strict';

const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const showModalBtns = document.querySelectorAll('.show-modal');

showModalBtns.forEach(showModalBtn =>
  showModalBtn.addEventListener('click', showModal)
);

document.querySelector('.close-modal').addEventListener('click', closeModal);
document.querySelector('.overlay').addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

function showModal() {
  modal.classList.remove('hidden');
  overLay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
}
