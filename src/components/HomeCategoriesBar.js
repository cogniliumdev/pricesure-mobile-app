import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { topCategories } from "../data/topCategories.js"
const HomeCategoriesBar = ({ navigation }) => {
    return (<>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-3 px-2">
                {
                    topCategories?.map((item, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="justify-center items-center"
                                onPress={() => navigation.navigate("Category", { category: item.category })}
                            >
                                <Image className="h-14 w-20 rounded" style={{ resizeMode: "cover" }} source={item.thumb} />
                                <Text >{item.title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </View>
        </ScrollView>
    </>
    )
}

export default HomeCategoriesBar;

{/* <Link to={{ screen: "MyCart" }}>
    <Text>Header</Text>
</Link> */}