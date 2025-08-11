import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

interface Form {
  name: string;
  fields: Field[];
  createdAt: string;
}

interface FormsState {
  currentForm: Form | null;
  savedForms: Form[];
}

const initialState: FormsState = {
  currentForm: { name: '', fields: [], createdAt: '' },
  savedForms: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addField: (state, action: PayloadAction<{ type: string; label?: string; required?: boolean }>) => {
      state.currentForm?.fields.push({
        id: uuidv4(),
        type: action.payload.type,
        label: action.payload.label || '',
        required: action.payload.required || false,
        defaultValue: '',
      });
    },
    updateField: (state, action: PayloadAction<{ index: number; key: string; value: any }>) => {
      if (state.currentForm) {
        (state.currentForm.fields[action.payload.index] as any)[action.payload.key] = action.payload.value;
      }
    },
    removeField: (state, action: PayloadAction<number>) => {
      if (state.currentForm) {
        state.currentForm.fields.splice(action.payload, 1);
      }
    },
    saveForm: (state, action: PayloadAction<string>) => {
      if (state.currentForm) {
        const newForm = {
          ...state.currentForm,
          name: action.payload,
          createdAt: new Date().toISOString(),
        };
        state.savedForms.push(newForm);
        localStorage.setItem('savedForms', JSON.stringify(state.savedForms));
        state.currentForm = { name: '', fields: [], createdAt: '' };
      }
    },
  },
});

export const { addField, updateField, removeField, saveForm } = formSlice.actions;
export default formSlice.reducer;
