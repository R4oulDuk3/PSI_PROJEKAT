// Get DOM Elements
const modal = document.querySelector('#my-modal');
 document.querySelectorAll('.modal-btn').forEach(item => {
  item.addEventListener('click', openModal);
});
const closeBtn = document.querySelector('.close');





// Close If Outside Click


// Get DOM Elements
const modal_del = document.querySelector('#delete-modal');
 document.querySelectorAll('.modal-btn-del').forEach(item => {
  item.addEventListener('click', openModal1);
});
const closeBtn_del = document.querySelector('.close-del');


// Events
//modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'flex';
  modal_del.style.display = 'none';
}

// Events
//modalBtn.addEventListener('click', openModal);
closeBtn_del.addEventListener('click', closeModal1);
window.addEventListener('click', outsideClick);

// Open
function openModal1() {
  modal_del.style.display = 'flex';
}

// Close
function closeModal() {
  modal.style.display = 'none';
  modal_del.style.display = 'none';
}
// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
  if (e.target == modal_del) {
    modal_del.style.display = 'none';
  }
}
