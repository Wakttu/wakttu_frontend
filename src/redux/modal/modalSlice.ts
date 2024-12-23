import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modalType: string;
  open: boolean;
  data?: any;
}

const initialState: ModalState = {
  modalType: '',
  open: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.modalType = action.payload;
      state.open = true;
    },
    closeModal: (state) => {
      state.open = false;
      state.modalType = '';
      state.data = undefined;
    },
    setDataModal: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

export const { openModal, closeModal, setDataModal } = modalSlice.actions;
export const selectModal = (state: { modal: ModalState }) => state.modal;
export const selectData = (state: { modal: ModalState }) => state.modal.data;

export default modalSlice.reducer;
