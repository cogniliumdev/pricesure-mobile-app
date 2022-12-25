import { Image, Text, View } from "react-native";
import { homeSlider } from "../data/homeSlider";
import ImageSlider from 'react-native-image-slider';

const imagesList = homeSlider?.map((img) => img.thumb);

const HomeSlider = () => {
    return (<>
        <View>
            <ImageSlider
                loopBothSides={true}
                autoPlayWithInterval={3000}
                images={imagesList}
                // style={{ width: "100%", height: 200 , }}
                customSlide={({ index, item, style, width }) => (
                    // It's important to put style here because it's got offset inside
                    <View key={index} style={[style, {paddingHorizontal: 3, backgroundColor:"white"}]}>
                        <Image source={item} style={{ width: "100%", height: 200, resizeMode: "stretch" }} />
                    </View>
                )}
            />

        </View>
    </>)
};
export default HomeSlider;