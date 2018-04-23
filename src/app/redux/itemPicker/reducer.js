import decks from 'app/data/decks.js';
import trucks from 'app/data/trucks.js';
import wheels from 'app/data/wheels.js';

import * as c from './constants';


const initialState = {
  currentPage: 0,
  pages: [
    {
      title: '데크',
      items: decks,
    },
    {
      title: '트럭',
      items: trucks,
    },
    {
      title: '휠',
      items: wheels,
    },
  ],
  selectedIds: [0, 0, 0],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case c.TO_PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };

    case c.TO_NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case c.SELECT_ITEM:
      return {
        ...state,
        selectedIds: state.selectedIds.map((selectedId, i) => {
          if (state.currentPage === i) {
            return action.index;
          }

          return selectedId;
        }),
      };

    default:
      return { ...state };
  }
};
