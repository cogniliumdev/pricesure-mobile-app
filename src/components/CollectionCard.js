import { Image, Text, TouchableOpacity, View } from "react-native";

const CollectionCard = ({ thumb, collection, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate("Category",
                    {
                        category: collection.category,
                        vendor: collection.vendor,
                        domain: collection.domain
                    })
            }
            }
            className="w-36 h-36 flex flex-col items-start mr-5"
            style={{
                // borderWidth: 0.3
            }}
        >
            <Image
                source={thumb}
                style={{ width: "100%", height: "100%", resizeMode: "cover" }}
            />

        </TouchableOpacity>
    )
};
export default CollectionCard;