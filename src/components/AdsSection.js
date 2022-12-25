import { ScrollView, Text, View } from "react-native";
import ProductCard1 from "./ProductCard1";

const AdsSection = ({ title, data ,navigation}) => {
    return (
        <View className="w-full px-2">
            <Text className="font-semibold text-lg mb-1">{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className="flex flex-row justify-start">
                    {
                        data?.items?.map((product, index) => {
                            return (<ProductCard1 key={index} data={product} navigation={navigation} />)
                        })
                    }
                    
                </View>
            </ScrollView>

        </View>
    )
};
export default AdsSection;