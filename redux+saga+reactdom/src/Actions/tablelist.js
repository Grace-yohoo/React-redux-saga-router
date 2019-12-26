import {FETCH,DELETE,CREATE,SEARCH,RESET, SAVE} from '../ActionTypes/tablelist';
import { action } from 'mobx';


export const createFetchAction = () => {

    return {
        type : FETCH,
        payload: action.payload
    }
}

export const createDeleteAction = data => {
        for (let k in data){
          data[k].key = data[k].createdAt
        }
        return{
            type: DELETE,
            payload : data
        }
}

export const CreateAddaction = () => {
        return {
            type: CREATE,
            payload: action.payload
        }
}

export const CreateSearchaction = () => {
        return {
          type:SEARCH,
          payload:action.payload
        }
}

export const CreateResetAction = () => {
      return {
        type: RESET,
      }
}

export const CreateSaveAction = () => {
      return {
        type: SAVE,
        payload: action.payload
      }

}