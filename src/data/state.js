const STATE = {
  items: [],
  selectedItems: [],
  filters: [],
  activeFilters: []
}

export const setFilters = (filters) => {
  STATE.filters = filters
}

export const getFilters = () => STATE.filters

export const setActiveFilters = (filters) => {
  STATE.activeFilters = filters
}

export const getActiveFilters = () => STATE.activeFilters

export const isActiveFilter = (projectId) =>
  Boolean(STATE.activeFilters.find((id) => id === projectId))

export const addFilter = (projectId) => {
  STATE.activeFilters.push(projectId)
}

export const removeFilter = (projectId) => {
  STATE.activeFilters = STATE.activeFilters.filter((id) => id !== projectId)
}

export const getItems = () => STATE.items

export const setItems = (items) => {
  STATE.items = items
}

export const getSelected = () => STATE.selectedItems

export const setSelected = (selected) => {
  STATE.selectedItems = selected
}

export const isSelected = (item) => Boolean(STATE.selectedItems.find(({ id }) => id === item.id))

export const addToSelected = (item) => {
  STATE.selectedItems.push(item)
}

export const removeFromSelected = (item) => {
  STATE.selectedItems = STATE.selectedItems.filter(({ id }) => {
    return id !== item.id
  })
}

export const moveItems = (items, projectId) => {
  const moved = getItems().map((item) => {
    if (items.find((id) => id === item.id)) {
      return { ...item, projectId }
    }
    return item
  })
  setItems(moved)
  setSelected([])
}

// example of sending data (just stringify object with state)
export const sendToFakeApi = () => {
  const url = 'http://example.com/my/fake/api'
  return window
    .fetch(url, {
      method: 'POST',
      body: JSON.stringify(STATE),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((response) => console.log('Success:', JSON.stringify(response)))
    .catch((error) => console.error('Error:', error))
}
