import initData from '../data/initData'
import { setItems, getItems, setFilters, setActiveFilters } from '../data/state'
import { renderFilter } from './filter'
import { renderItems } from './item'

export const loadInitialData = () => {
  // fake load from api/LS/...
  setItems(initData.items)
  // extract init filter
  const projects = extractProjects(getItems())
  setFilters(projects)
  setActiveFilters(projects)
}

const extractProjects = (items) => {
  const projectIds = items.map(({ projectId }) => projectId)
  return [...new Set(projectIds)]
}
export const renderScreen = () => {
  renderFilter()
  renderItems()
}
