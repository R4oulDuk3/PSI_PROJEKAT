


function initializeDrag(){
  console.log("check")
  const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
console.log('check')
dragged_copy=null
draggables.forEach(draggable => {
  
  draggable.addEventListener('dragstart', () => {
    let new_copy=draggable.cloneNode(true)
    new_copy.querySelector('.sm-button').addEventListener('click',()=>{
      new_copy.remove()
    })
    dragged_copy=new_copy
    draggable.classList.add('dragging')
  })

  

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    dragged_copy.querySelector('.sm-button').style.display='block'
    dragged_copy=null
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    let id=dragged_copy.getAttribute('id')
    console.log("DRAGGED  "+id)
    let alreadyHas=false;
    container.childNodes.forEach(konobar=>{
      const kId=konobar.getAttribute('id')
      if(kId===id)alreadyHas=true
    })
    if(alreadyHas)return
    if (afterElement == null) {
      container.appendChild(dragged_copy)
    } else {
      container.insertBefore(dragged_copy, afterElement)
    }
  })
})

}



function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}


function delete_elem(){

}