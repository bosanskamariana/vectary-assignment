import { setActiveFilters, getSelected, moveItems } from './../data/state'
import { renderItems } from './item'
import { renderFilter } from './filter'

export const dragOverFilter = (projectId) => (event) => {
  event.preventDefault()
}

export const dragLeaveFilter = (projectId) => (event) => {
  event.target.classList.remove('dropped')
  event.preventDefault()
}
export const dragEnterFilter = (projectId) => (event) => {
  event.target.classList.add('dropped')
  event.preventDefault()
}

export const dropOnFilter = (projectId) => (event) => {
  const dragged = event.dataTransfer.getData('text')
  const selectedItems = getSelected().map(({ id }) => id)
  const draggedInSelected = selectedItems.find((id) => id === dragged)
  if (draggedInSelected) {
    moveItems(selectedItems, projectId)
  } else {
    moveItems([dragged], projectId)
  }
  event.preventDefault()
  setActiveFilters([projectId])
  renderFilter()
  renderItems()
  event.target.classList.remove('dropped')
}
