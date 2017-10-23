import * as c from './constants';


const initialState = {
  perspective: 'top',
};


export default (state = initialState, action) => {
  switch (action.type) {
    case c.CHANGE_PERSPECTIVE:
      return {
        ...state,
        perspective: action.perspective,
      };

    default:
      return { ...state };
  }
};
