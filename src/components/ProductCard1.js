import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLOURS } from '../../database/Database';

const ProductCard1 = ({ data, navigation={navigation} }) => {
    const { title, price, discount, image, vendor, domain, product_url, price_before_sale } = data?.fields;
    return (
        <TouchableOpacity
        onPress={() => navigation.navigate('ProductInfo', { productData: data })}
        className="w-36 bg-slate-50 h-44 flex flex-col border-slate-500 items-start mr-5"
            style={{
                // borderWidth: 0.3
            }}
        >
            <Image
                // source={require("../images/topCategories/pants.jpg")}
                source={{ uri: image }}
                style={{ width: "100%", height: 100, resizeMode: "cover" }}
            />
            <View className="absolute top-1 left-1 bg-red-600 px-1">
                <Text className="text-white text-xs">
                    Sale {discount}%
                </Text>
            </View>
            {/* line-through decoration-solid */}
            {/* style={{textDecorationLine:"line-through"}} */}
            <View className="mt-1 flex flex-col justify-between items-start px-2">
                <Text className="font-bold text-md text-slate-600">{title.slice(0, 12)}...</Text>
                <Text className="font-bold text-xs text-slate-400">{domain ? domain : vendor}</Text>
                <View className="flex-row gap-2">
                    <Text className="text-xs text-black line-through decoration-solid">{price_before_sale}</Text>
                    <Text className="font-bold text-xs text-red-500">{price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
};
export default ProductCard1;