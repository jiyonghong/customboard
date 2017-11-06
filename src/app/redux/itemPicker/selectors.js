import { createSelector } from 'reselect';


const pagesSelector = state => state.itemPicker.pages;
const selectedIdsSelector = state => state.itemPicker.selectedIds;


const itemSelector = createSelector(
  [pagesSelector, selectedIdsSelector],
  (pages, selectedIds) => {
    const [deckId, truckId, wheelId] = selectedIds;
    const deck = deckId !== null ? pages[0].items[deckId] : null;
    const truck = truckId !== null ? pages[1].items[truckId] : null;
    const wheel = wheelId !== null ? pages[2].items[wheelId] : null;

    return {
      deck,
      truck,
      wheel,
    };
  },
);

export default {
  itemSelector,
};
