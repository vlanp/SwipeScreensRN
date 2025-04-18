import { create } from "zustand";

interface ISwipeStoreStates {
  onTouchStartX: number | null;
  onTouchX: number | null;
  onTouchEndX: number | null;
  swipeXDurationMs: number | null;
  disableOnTouch: boolean;
}

interface ISwipeStoreActions {
  setOnTouchStartX: (onTouchStartX: number) => void;
  setOnTouchX: (onTouchX: number | null) => void;
  setOnTouchEndX: (onTouchEndX: number | null) => void;
  setSwipeXDurationMs: (swipeXDurationMs: number | null) => void;
  setDisableOnTouch: (disableOnTouch: boolean) => void;
}

const useSwipeStore = create<ISwipeStoreStates & ISwipeStoreActions>((set) => ({
  onTouchStartX: null,
  onTouchX: null,
  onTouchEndX: null,
  swipeXDurationMs: null,
  disableOnTouch: false,
  setOnTouchStartX: (onTouchStartX: number | null) => set({ onTouchStartX }),
  setOnTouchX: (onTouchX: number | null) => set({ onTouchX }),
  setOnTouchEndX: (onTouchEndX: number | null) => set({ onTouchEndX }),
  setSwipeXDurationMs: (swipeXDurationMs: number | null) =>
    set({ swipeXDurationMs: swipeXDurationMs }),
  setDisableOnTouch: (disableOnTouch: boolean) => set({ disableOnTouch }),
}));

export default useSwipeStore;
