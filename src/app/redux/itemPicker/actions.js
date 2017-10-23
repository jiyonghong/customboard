import * as c from './constants';


const toPrevPage = () => ({
  type: c.TO_PREV_PAGE,
});


const toNextPage = () => ({
  type: c.TO_NEXT_PAGE,
});


const selectItem = (pageType, index) => ({
  type: c.SELECT_ITEM,
  pageType,
  index,
});


export default {
  toPrevPage,
  toNextPage,
  selectItem,
};
