const errorReducer = (state = { message: '' }, action) => {
    switch (action.type) {
        case 'ERROR_RECEIVED':
            return {
                ...state,
                message: action.message,
                alertType: action.alertType
            }
        case 'NO_ERROR_RECEIVED':
            return {
                ...state,
                message: '',
                alertType: ''

            }
        case 'POST_ERROR':
            return {
                ...state,
                message: action.message,
                alertType: action.alertType
            }
        case 'POST_SUCCESS':
            return {
                ...state,
                message: action.message,
                alertType: action.alertType
            }
        default:
            return state;
    }
}

export default errorReducer;