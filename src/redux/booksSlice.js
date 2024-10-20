// src/redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dummyBooks from '../data/dummyBooks';

const booksSlice = createSlice({
  name: 'books',
  initialState: dummyBooks, // Initialize state with dummy data
  reducers: {
    addBook: (state, action) => {
      const newBook = { ...action.payload, id: state.length + 1 };
      state.push(newBook);
    },
    deleteBook: (state, action) => {
      return state.filter((book) => book.id !== action.payload);
    },
    updateBook: (state, action) => {
      const index = state.findIndex((book) => book.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    // Add more reducers as needed
  },
});

export const { addBook, deleteBook, updateBook } = booksSlice.actions;
export default booksSlice.reducer;
