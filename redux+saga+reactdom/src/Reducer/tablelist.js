import {FETCH, DELETE,CREATE,SEARCH,SAVE} from '../ActionTypes/tablelist'


const initialState = {
    data : '',
};



export const  tablelistReducer = (state = initialState, action ) => {
    switch (action.type) {
        case FETCH:
            return {
                ...state,
                data : action.payload,
            }
        case DELETE:
            return {
                ...state,
                data:action.payload
            }
             
        case CREATE: {
            return {
                ...state,
                data:action.payload
            }
         }
        case SEARCH: {
            return {
                ...state,
                data:action.payload
            }
        }
        case SAVE: {
            return {
                ...state,
                data:action.payload
            }
        }


        default:
            return state;
    }
}