import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../pages/Counterslice';

export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
