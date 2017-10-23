import * as c from './constants';


const changePerspective = perspective => ({
  type: c.CHANGE_PERSPECTIVE,
  perspective,
});


export default {
  changePerspective,
};
