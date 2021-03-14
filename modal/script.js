'use strict';

const modal = document.querySelector('.modal');
const overLay = document.querySelector('.overlay');
const showModalBtns = document.querySelectorAll('.show-modal');

function showModal() {
  modal.classList.remove('hidden');
  overLay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overLay.classList.add('hidden');
}

showModalBtns.forEach(showModalBtn =>
  showModalBtn.addEventListener('click', showModal)
);

document.querySelector('.close-modal').addEventListener('click', closeModal);
