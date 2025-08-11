import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './formSlice';

export const store = configureStore({
  reducer: {
    forms: formsReducer,
  },
});

// ✅ Correct type exports for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
