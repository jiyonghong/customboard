import decks from 'app/data/decks.js';
import trucks from 'app/data/trucks.js';
import wheels from 'app/data/wheels.js';

import * as c from './constants';


const initialState = {
  currentPage: 0,
  pages: [
    {
      title: 'Deck',
      items: decks,
    },
    {
      title: 'Trucks',
      items: trucks,
    },
    {
      title: 'Wheels',
      items: wheels,
    },
  ],
  selectedIds: [null, null, null],
};


export default (state = initialState, action) => {
  switch (action.type) {
    case c.TO_PREV_PAGE:
      return {
        ...state,
        currentPage: state.currentPage > 0 ?
          state.currentPage - 1 : state.currentPage,
      };

    case c.TO_NEXT_PAGE:
      return {
        ...state,
        currentPage: state.currentPage + 1 < state.pages.length ?
          state.currentPage + 1 : state.currentPage,
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
