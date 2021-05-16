function dataReducer(state, action) {
    switch (action.type) {
      case 'ResetData':
        return {
            ...state,
            data: action.payload,
        }
      case 'InsertData':
        return{
            ...state,
            data: [...state.data, action.payload]
        }
      case 'DeleteData':
        return{
            ...state,
            data: state.data.filter(item => item.id !== parseInt(action.payload))
        }
      case 'Failure':
        return {
            ...state,
            error: action.payload,
        }
      default:
        throw new Error()
    }
}

export default dataReducer