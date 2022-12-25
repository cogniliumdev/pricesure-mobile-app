import { ScrollView, Text, View, ViewBase } from "react-native";
import CollectionCard from "./CollectionCard";
import { collectionsList } from "../data/collections";

const CollectionsSection = ({ title, navigation }) => {
    return (
        <View className="w-full px-2">
            <Text className="font-semibold text-lg mb-1">{title}</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View className="flex flex-row justify-start">
                    {collectionsList?.map((collection, index) => {
                        return (
                            <CollectionCard navigation={navigation} collection={collection.collection} key={index} thumb={collection.thumb} />
                        )
                    })}
                </View>
            </ScrollView>

        </View>
    )
};
export default CollectionsSection;