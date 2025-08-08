export const ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  UPDATE_TITLE: 'UPDATE_TITLE',
  UPDATE_TEXT: 'UPDATE_TEXT',
  UPDATE_IMAGE: 'UPDATE_IMAGE',
  REMOVE_IMAGE: 'REMOVE_IMAGE',
  MOVE_UP: 'MOVE_UP',
  MOVE_DOWN: 'MOVE_DOWN',
  SET: 'SET'
}

// Initial state
const initialState = {
  items: []
}

// Reducer function
export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.ADD:
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: `item-${new Date().getTime()}-${Math.random()}`,
            title: '',
            text: '',
            image_id: null,
            image_url: '',
            image_alt: '',
            image_srcset: '',
            image_sizes: '',
            image_width: '',
            image_height: '',
            image_loading: action.image_loading || 'lazy'
          }
        ]
      }

    case ACTIONS.REMOVE:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.index)
      }

    case ACTIONS.UPDATE_TITLE:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? { ...item, title: action.title }
            : item
        )
      }

    case ACTIONS.UPDATE_TEXT:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? { ...item, text: action.text }
            : item
        )
      }

    case ACTIONS.UPDATE_IMAGE:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? {
              ...item,
              image_id: action.image.id,
              image_url: action.image.url,
              image_alt: action.image.alt || '',
              image_srcset: action.image.srcset || '',
              image_sizes: action.image.sizes || '',
              image_width: action.image.width || '',
              image_height: action.image.height || '',
              image_loading: action.image.loading || 'lazy'
            }
            : item
        )
      }

    case ACTIONS.REMOVE_IMAGE:
      return {
        ...state,
        items: state.items.map((item, index) =>
          index === action.index
            ? {
              ...item,
              image_id: null,
              image_url: '',
              image_alt: '',
              image_srcset: '',
              image_sizes: '',
              image_width: '',
              image_height: '',
              image_loading: action.image_loading || 'lazy'
            }
            : item
        )
      }

    case ACTIONS.MOVE_UP:
      if (action.index === 0) return state
      const itemsUp = [...state.items];
      [itemsUp[action.index - 1], itemsUp[action.index]] = [itemsUp[action.index], itemsUp[action.index - 1]]
      return {
        ...state,
        items: itemsUp
      }

    case ACTIONS.MOVE_DOWN:
      if (action.index >= state.items.length - 1) return state
      const itemsDown = [...state.items];
      [itemsDown[action.index], itemsDown[action.index + 1]] = [itemsDown[action.index + 1], itemsDown[action.index]]
      return {
        ...state,
        items: itemsDown
      }

    default:
      return state
  }
}
