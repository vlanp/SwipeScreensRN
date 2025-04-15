import { Text, View } from "react-native";
import useSwipeStore from "@/zustands/useSwipeStore";
import LeftSwipeScreen from "@/components/LeftSwipeScreen";

function Index() {
  const setOnTouchStartX = useSwipeStore((state) => state.setOnTouchStartX);
  const setOnTouchX = useSwipeStore((state) => state.setOnTouchX);
  const setOnTouchEndX = useSwipeStore((state) => state.setOnTouchEndX);
  const setSwipeXDurationMs = useSwipeStore(
    (state) => state.setSwipeXDurationMs
  );
  let startTimeMs = 0;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100%",
      }}
      onTouchStart={(e) => {
        const disableOnTouch = useSwipeStore.getState().disableOnTouch;
        if (disableOnTouch) {
          return;
        }
        const x = e.nativeEvent.locationX;
        // const toto = e.currentTarget.measure
        startTimeMs = performance.now();
        setSwipeXDurationMs(null);
        setOnTouchEndX(null);
        setOnTouchX(null);
        setOnTouchStartX(x);
      }}
      onTouchMove={(e) => {
        const disableOnTouch = useSwipeStore.getState().disableOnTouch;
        if (disableOnTouch) {
          return;
        }
        const x = e.nativeEvent.locationX;
        // console.log("onTouchMove", x);
        setOnTouchX(x);
      }}
      onTouchEnd={(e) => {
        const disableOnTouch = useSwipeStore.getState().disableOnTouch;
        if (disableOnTouch) {
          return;
        }
        const swipeXDurationMs = performance.now() - startTimeMs;
        setSwipeXDurationMs(swipeXDurationMs);
        const x = e.nativeEvent.locationX;
        setOnTouchEndX(x);
      }}
    >
      <LeftSwipeScreen />
      {/* <View
        style={{
          width: "30%",
          height: "100%",
          backgroundColor: "blue",
          opacity: 0.5,
        }}
      ></View>
      <View style={{ width: "40%", height: "100%" }}></View>

      <View style={{ flex: 1, backgroundColor: "green", opacity: 0.5 }}></View> */}
    </View>
  );
}

export default Index;
