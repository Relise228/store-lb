import {createSlice} from '@reduxjs/toolkit';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    cards: [],
  },
  reducers: {
    setCardsData: (state, action) => {
      state.cards = action.payload;
    },
  },
});

export const {setCardsData} = cardsSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getAsyncCards = () => (dispatch) => {
  fetch('http://localhost:3000/')
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      dispatch(setCardsData(data));
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCards = (state) => state.cards.cards;

export const selectCardsOther = (state, type) =>
  state.cards.cards.filter((card) => card.type === type);

export default cardsSlice.reducer;
