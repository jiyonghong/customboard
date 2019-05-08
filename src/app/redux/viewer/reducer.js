import * as t from './types';


const initialState = {
  perspective: 'top',
  graphicId: 0,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case t.CHANGE_PERSPECTIVE:
      return {
        ...state,
        perspective: action.perspective,
      };

    case t.CHANGE_GRAPHIC:
      return {
        ...state,
        graphicId: action.graphicId,
      };

    default:
      return { ...state };
  }
};
