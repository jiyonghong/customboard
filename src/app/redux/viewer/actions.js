import * as t from './types';


const changePerspective = perspective => ({
  type: t.CHANGE_PERSPECTIVE,
  perspective,
});


const changeGraphic = graphicId => ({
  type: t.CHANGE_GRAPHIC,
  graphicId,
});


export default {
  changePerspective,
  changeGraphic,
};
