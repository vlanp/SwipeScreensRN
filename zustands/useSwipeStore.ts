import { create } from "zustand";

interface ISwipeStoreStates {
  onTouchStartX: number | null;
  onTouchX: number | null;
  onTouchEndX: number | null;
}

interface ISwipeStoreActions {
  setOnTouchStartX: (onTouchStartX: number | null) => void;
  setOnTouchX: (onTouchX: number | null) => void;
  setOnTouchEndX: (onTouchEndX: number | null) => void;
}

const useSwipeStore = create<ISwipeStoreStates & ISwipeStoreActions>((set) => ({
  onTouchStartX: null,
  onTouchX: null,
  onTouchEndX: null,
  setOnTouchStartX: (onTouchStartX: number | null) => set({ onTouchStartX }),
  setOnTouchX: (onTouchX: number | null) => set({ onTouchX }),
  setOnTouchEndX: (onTouchEndX: number | null) => set({ onTouchEndX }),
}));

export default useSwipeStore;
