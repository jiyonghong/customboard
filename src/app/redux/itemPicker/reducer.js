import decks from 'app/data/decks.js';
import trucks from 'app/data/trucks.js';
import wheels from 'app/data/wheels.js';

import * as t from './types';


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
  selectedIds: [0, null, null],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case t.TO_PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
      };

    case t.TO_NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };

    case t.SELECT_ITEM:
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
