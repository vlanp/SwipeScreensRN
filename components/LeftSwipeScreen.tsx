import useSwipeStore from "@/zustands/useSwipeStore";
import { MutableRefObject, useRef } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

const LeftSwipeScreen = () => {
  const onTouchStartX = useSwipeStore((state) => state.onTouchStartX);
  const onTouchX = useSwipeStore((state) => state.onTouchX);
  const onTouchEndX = useSwipeStore((state) => state.onTouchEndX);
  const swipeXDurationMs = useSwipeStore((state) => state.swipeXDurationMs);
  const setDisableOnTouch = useSwipeStore((state) => state.setDisableOnTouch);
  const screenWidth = useWindowDimensions().width;
  const prevMarginLeftPercent = useRef<number>(-100);
  const leftMarginOffset = useRef<number>(0);
  let swipeXSpeed: number | null = null;
  if (onTouchStartX && onTouchEndX && swipeXDurationMs) {
    swipeXSpeed = ((onTouchEndX - onTouchStartX) * 1000) / swipeXDurationMs;
  }

  const styles = getStyles(
    prevMarginLeftPercent,
    onTouchStartX,
    onTouchX,
    onTouchEndX,
    screenWidth,
    leftMarginOffset,
    swipeXSpeed,
    setDisableOnTouch
  );

  return (
    <View
      style={styles.mainView}
      onLayout={(e) => {
        leftMarginOffset.current = e.nativeEvent.layout.x;
      }}
    ></View>
  );
};

const getStyles = (
  prevMarginLeftPercent: MutableRefObject<number>,
  onTouchStartX: number | null,
  onTouchX: number | null,
  onTouchEndX: number | null,
  screenWidth: number,
  leftMarginOffset: MutableRefObject<number>,
  swipeXSpeed: number | null,
  setDisableOnTouch: (disableOnTouch: boolean) => void
) => {
  let marginLeftPercent = prevMarginLeftPercent.current;
  if (onTouchStartX && onTouchX) {
    const correctedOnTouchX =
      prevMarginLeftPercent.current === 0 && Platform.OS === "ios"
        ? onTouchX + leftMarginOffset.current
        : onTouchX;
    const tempMarginLeftPercent =
      marginLeftPercent +
      ((correctedOnTouchX - onTouchStartX) / screenWidth) * 100;
    marginLeftPercent =
      tempMarginLeftPercent < -100
        ? -100
        : tempMarginLeftPercent > 0
          ? 0
          : tempMarginLeftPercent;
  }
  if (onTouchEndX) {
    // setDisableOnTouch(true);
    const prevPosition: "middle" | "side" =
      prevMarginLeftPercent.current === 0 ? "middle" : "side";
    const xPositionMiddleTreshold = prevPosition === "middle" ? -30 : -70;
    const positionByXPosition: "middle" | "side" =
      marginLeftPercent > xPositionMiddleTreshold ? "middle" : "side";
    const xSpeedTreshold = screenWidth / 4;
    const positionByXSpeed: "middle" | "side" =
      prevPosition === "middle"
        ? (swipeXSpeed || 0) < -xSpeedTreshold
          ? "side"
          : "middle"
        : (swipeXSpeed || 0) > xSpeedTreshold
          ? "middle"
          : "side";
    const position =
      positionByXPosition === prevPosition && positionByXSpeed === prevPosition
        ? prevPosition
        : prevPosition === "middle"
          ? "side"
          : "middle";
    if (position === "middle") {
      marginLeftPercent = 0;
      prevMarginLeftPercent.current = 0;
    } else {
      marginLeftPercent = -100;
      prevMarginLeftPercent.current = -100;
    }
  }
  const styles = StyleSheet.create({
    mainView: {
      pointerEvents: Platform.OS === "ios" ? undefined : "none",
      position: "absolute",
      marginLeft: `${marginLeftPercent}%`,
      backgroundColor: "red",
      width: "100%",
      height: "100%",
    },
  });
  return styles;
};

export default LeftSwipeScreen;
