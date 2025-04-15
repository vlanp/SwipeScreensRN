import "../wdyr";
import { Text, useWindowDimensions, View } from "react-native";
import useCountRender from "@/hooks/useCountRender";
import useSwipeStore from "@/zustands/useSwipeStore";

function Index() {
  useCountRender();
  const setOnTouchStartX = useSwipeStore((state) => state.setOnTouchStartX);
  const setOnTouchX = useSwipeStore((state) => state.setOnTouchX);
  const setOnTouchEndX = useSwipeStore((state) => state.setOnTouchEndX);
  const { height, width } = useWindowDimensions();

  console.log("height", height);
  console.log("width", width);

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
        const x = e.nativeEvent.locationX;
        setOnTouchEndX(x);
      }}
    >
      <LeftSwipeModal />
      <Text>Others cases</Text>
    </View>
  );
}

Index.whyDidYouRender = { logOnDifferentValues: true };

export default Index;
