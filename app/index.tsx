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
        const x = e.nativeEvent.locationX;
        // const toto = e.currentTarget.measure
        startTimeMs = performance.now();
        setSwipeXDurationMs(null);
        setOnTouchEndX(null);
        setOnTouchX(null);
        setOnTouchStartX(x);
      }}
      onTouchMove={(e) => {
        const x = e.nativeEvent.locationX;
        // console.log("onTouchMove", x);
        setOnTouchX(x);
      }}
      onTouchEnd={(e) => {
        const swipeXDurationMs = performance.now() - startTimeMs;
        setSwipeXDurationMs(swipeXDurationMs);
        const x = e.nativeEvent.locationX;
        setOnTouchEndX(x);
      }}
    >
      <LeftSwipeScreen />
      <Text>Others cases</Text>
    </View>
  );
}

export default Index;
