import * as t from './types';


const toPrevPage = () => ({
  type: t.TO_PREV_PAGE,
});


const toNextPage = () => ({
  type: t.TO_NEXT_PAGE,
});


const selectItem = (pageType, index) => ({
  type: t.SELECT_ITEM,
  pageType,
  index,
});


export default {
  toPrevPage,
  toNextPage,
  selectItem,
};
