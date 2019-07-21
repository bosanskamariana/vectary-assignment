import projectMap from './../data/projectMap'
import {
  isActiveFilter,
  addFilter,
  removeFilter,
  getActiveFilters,
  getFilters,
  setActiveFilters
} from './../data/state'
import { dragEnterFilter, dragLeaveFilter, dragOverFilter, dropOnFilter } from './moveHandlers'
import { renderItems } from './item'

const toggleFilter = (projectId) => () => {
  const allActive = getActiveFilters().length === getFilters().length
  const onlyOne = getActiveFilters().length === 1

  if (!projectId) {
    setActiveFilters(getFilters())
  } else if (allActive) {
    // use case when 'All projects' was active before last click
    setActiveFilters([])
    addFilter(projectId)
  } else if (isActiveFilter(projectId) && !onlyOne) {
    // deselect folder just in case some other is active to prevent empty screen
    removeFilter(projectId)
  } else if (!isActiveFilter(projectId)) {
    addFilter(projectId)
  }
  renderFilter()
  renderItems()
}

export const createFilterItem = (projectId) => {
  const el = document.createElement('li')
  const allActive = getActiveFilters().length === getFilters().length
  const selected =
    (isActiveFilter(projectId) && !allActive) || (!projectId && allActive) ? 'selected' : ''

  el.setAttribute('class', `filterItem ${selected}`)
  el.innerText = projectMap[projectId] || 'All Projects'

  el.addEventListener('click', toggleFilter(projectId))
  if (projectId) {
    el.addEventListener('dragenter', dragEnterFilter(projectId))
    el.addEventListener('dragleave', dragLeaveFilter(projectId))
    el.addEventListener('dragover', dragOverFilter(projectId))
    el.addEventListener('drop', dropOnFilter(projectId))
  }
  return el
}

export const renderFilter = () => {
  const list = document.querySelector('#filter')
  const selectAll = createFilterItem()

  const fragment = document.createDocumentFragment()
  fragment.appendChild(selectAll)
  const filters = getFilters()
  filters.sort((a, b) => a - b)
  filters.forEach((item) => {
    const li = createFilterItem(item)
    fragment.appendChild(li)
  })

  while (list.firstChild) {
    list.removeChild(list.firstChild)
  }
  list.appendChild(fragment)
}
