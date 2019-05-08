import { createSelector } from 'reselect';

import graphics from 'app/data/graphics';


const pagesSelector = state => state.itemPicker.pages;
const boardSelector = state => state.itemPicker.selectedIds;
const graphicSelector = state => state.viewer.graphicId;


const itemSelector = createSelector(
  [pagesSelector, boardSelector, graphicSelector],
  (pages, board, graphicId) => {
    const [deckId, truckId, wheelId] = board;
    const deck = deckId !== null ? pages[0].items[deckId] : null;
    const truck = truckId !== null ? pages[1].items[truckId] : null;
    const wheel = wheelId !== null ? pages[2].items[wheelId] : null;
    const graphic = graphicId !== null ? graphics[graphicId] : null;

    return {
      deck,
      truck,
      wheel,
      graphic,
    };
  },
);

export default {
  itemSelector,
};
