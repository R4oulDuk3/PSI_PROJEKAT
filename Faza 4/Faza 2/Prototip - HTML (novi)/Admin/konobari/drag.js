const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')
dragged_copy=null
draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    dragged_copy=draggable.cloneNode(true)
    draggable.classList.add('dragging')

  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
    dragged_copy=null
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(dragged_copy)
    } else {
      container.insertBefore(dragged_copy, afterElement)
    }
  })
})


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