// Get DOM Elements
const modal = document.querySelector('#delete-modal');
 document.querySelectorAll('.modal-btn-del').forEach(item => {
  item.addEventListener('click', openModal);
});
const closeBtn = document.querySelector('.close-del');

// Events
//modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'flex';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}
