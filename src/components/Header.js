import { View, Text, TextInput, Pressable, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from "react";
import SideBar from "./SideBar";


const Header = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState();
    const [handelToggleSidebar, sethandelToggleSidebar] = useState(false);


    const handelSearch = () => {
        if (searchQuery == null) return;
        navigation.push("Category", { searchQuery: searchQuery })
    }

    return (<>

        {/* SIDEBAR COPMPONENT */}
        <SideBar handelToggleSidebar={handelToggleSidebar} navigation={navigation} />

        {/* HEADER COPMPONENT */}
        <View
            className="w-full flex-row justify-between items-center pt-2 px-2 bg-blue-500"
        >
            <Text className="text-xl text-white font-bold">PriceSure</Text>

            <View className="flex-row gap-3">
                <TouchableOpacity
                    onPress={() => sethandelToggleSidebar(!handelToggleSidebar)}
                >
                    <Entypo
                        name="shopping-bag"
                        style={{ fontSize: 18, color: "black", padding: 9, borderRadius: 10, backgroundColor: "white" }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
                    <MaterialCommunityIcons
                        name="cart"
                        style={{
                            fontSize: 18, color: "black", padding: 9, borderRadius: 10, backgroundColor: "white"
                        }}
                    />
                </TouchableOpacity>
            </View>
        </View>

        <View className="h-16 bg-blue-500 justify-center items-center">
            <View className="w-full flex-row justify-between items-center gap-1 px-2">
                <TextInput
                    className="flex-1 bg-white rounded p-2"
                    placeholder="Search"
                    onChangeText={(text) => setSearchQuery(text)}
                />
                <Pressable
                    android_ripple={{ color: "slate-200" }}
                    className="justify-center items-center h-11 p-2 border-l border-slate-400 rounded bg-white"
                    onPress={handelSearch}
                >
                    <FontAwesome name="search" color={"black"} size={15} />
                </Pressable>
            </View>
        </View>

    </>
    )
}

export default Header;

{/* <Link to={{ screen: "MyCart" }}>
    <Text>Header</Text>
</Link> */}