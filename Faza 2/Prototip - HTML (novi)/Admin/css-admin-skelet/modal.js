// Get DOM Elements
const modal = document.querySelectorAll('.my-modal').forEach(item => {
  item.addEventListener('click',  openModal)
})
const modalBtns = document.querySelectorAll('.modal-btn').forEach(item => {
  item.addEventListener('click',  closeModal)
});
const closeBtn = document.querySelectorAll('.close').forEach(item => {
  item.addEventListener('click',  outsideClick)
});

// Events
modalBtns.addEventListener('click', openModal);
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
