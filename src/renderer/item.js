import {
  isSelected,
  addToSelected,
  removeFromSelected,
  getActiveFilters,
  getItems
} from './../data/state'

const selectItem = (item) => ({ target }) => {
  if (isSelected(item)) {
    removeFromSelected(item)
  } else {
    addToSelected(item)
  }
  renderItems()
}

const startMove = (item) => (event) => {
  event.dataTransfer.setData('text', item.id)
}

export const createItem = (item) => {
  const content = document.createElement('div')
  content.setAttribute('class', 'content')
  content.innerText = item.num

  const btn = document.createElement('button')
  btn.addEventListener('click', selectItem(item))
  btn.setAttribute('class', 'selectBtn')

  const el = document.createElement('li')
  el.addEventListener('dragstart', startMove(item))
  const selected = isSelected(item) ? 'selected' : ''
  el.setAttribute('class', `item ${selected}`)
  el.setAttribute('draggable', true)

  el.appendChild(btn)
  el.appendChild(content)

  return el
}

export const renderItems = () => {
  const list = document.querySelector('#container')
  const fragment = document.createDocumentFragment()
  const usedFilters = getActiveFilters()
  const activeItems = getItems().filter(({ projectId }) =>
    Boolean(usedFilters.find((filter) => filter === projectId))
  )
  activeItems.sort((a, b) => a.num - b.num)

  activeItems.forEach((item) => {
    const li = createItem(item)
    fragment.appendChild(li)
  })

  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }

  list.appendChild(fragment)
}
