import useSwipeStore from "@/zustands/useSwipeStore";
import { MutableRefObject, useRef } from "react";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

const LeftSwipeScreen = () => {
  const prevMarginLeftPercent = useRef<number>(-100);
  const onTouchStartX = useSwipeStore((state) => state.onTouchStartX);
  const onTouchX = useSwipeStore((state) => state.onTouchX);
  const onTouchEndX = useSwipeStore((state) => state.onTouchEndX);
  const swipeXDurationMs = useSwipeStore((state) => state.swipeXDurationMs);
  const screenWidth = useWindowDimensions().width;
  const whoIsResponding = useRef<"self" | "parent">("parent");
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
    whoIsResponding,
    leftMarginOffset,
    swipeXSpeed
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
  whoIsResponding: MutableRefObject<"self" | "parent">,
  leftMarginOffset: MutableRefObject<number>,
  swipeXSpeed: number | null
) => {
  let marginLeftPercent = prevMarginLeftPercent.current;
  if (onTouchStartX && onTouchX) {
    const correctedOnTouchX =
      whoIsResponding.current === "self" && Platform.OS === "ios"
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
    const treshold = whoIsResponding.current === "self" ? -40 : -60;
    if (marginLeftPercent > treshold || (swipeXSpeed || 0) > screenWidth / 4) {
      marginLeftPercent = 0;
      prevMarginLeftPercent.current = 0;
      whoIsResponding.current = "self";
    } else {
      marginLeftPercent = -100;
      prevMarginLeftPercent.current = -100;
      whoIsResponding.current = "parent";
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
