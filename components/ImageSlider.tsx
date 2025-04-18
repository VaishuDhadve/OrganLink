import React, { useRef, useState, useEffect } from "react";
import { View, ScrollView, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const images = [
  require("@/assets/images/sliderImg1.png"),
  require("@/assets/images/sliderImg2.png"),
  require("@/assets/images/sliderImg1.png"),
];

const ImageSlider = () => {
  const scrollRef = useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % images.length;
      scrollRef.current.scrollTo({ x: nextIndex * width, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const onScroll = (event: any) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slide);
  };

  return (
    <View className="mb-6">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={onScroll}
        showsHorizontalScrollIndicator={false}
        className="mx-5"
        scrollEventThrottle={16}>
        {images.map((img, index) => (
          <View key={index} className="rounded-md mx-1">
            <Image
              source={img}
              style={{ width: width - 40, height: 220, borderRadius: 12 }}
              resizeMode="cover"
            />
          </View>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="flex-row justify-center mt-2">
        {images.map((_, i) => (
          <View
            key={i}
            className={`w-2 h-2 mx-1 rounded-full ${
              i === currentIndex ? "bg-blue-500" : "bg-gray-400"
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;
