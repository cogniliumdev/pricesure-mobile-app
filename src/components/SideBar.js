import { View, Text, Animated, TouchableOpacity, Pressable, LayoutAnimation, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import { List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { categories } from "../data/categories.js";


const SideBar = ({ handelToggleSidebar, navigation }) => {
    const [show, setShow] = useState(false);


    const fadeAnime = useRef(new Animated.Value(-900)).current;

    const toggleSidebar = () => {
        Animated.timing(fadeAnime, {
            toValue: show ? 0 : -900,
            duration: 200, // ms
            useNativeDriver: true
        }).start();

        setShow(!show)
    }

    useEffect(() => {
        toggleSidebar();
    }, [handelToggleSidebar]);



    const animation = () => {
        LayoutAnimation.configureNext({
            duration: 100,
            create: { type: "linear", property: "opacity" },
            update: { type: "linear", springDamping: 0.4 },
            delete: { type: "linear", property: "opacity" }
        });
    };
    return (
        <>
            <Animated.View
                className={`absolute top-0 left-0 z-50 w-[70%] h-full bg-slate-50 shadow-2xl`}
                style={{
                    transform: [{
                        // translateX: show ? 0 : -290
                        translateX: fadeAnime
                    }]
                }}
            >
                <View className="bg-blue-500 py-3 flex-row justify-between items-center px-2 mt-5">
                    <Text className="text-white text-lg font-bold">
                        CATEGORIES
                    </Text>
                    {/* <TouchableOpacity className="p-2 bg-white rounded-md"
                        onPress={toggleSidebar}
                    >
                        <FontAwesome name="close" color={"black"} size={15} />

                    </TouchableOpacity> */}
                </View>

                <ScrollView>
                    {/* ACCORDION  */}
                    <List.Section>
                        {/* first level */}
                        {categories?.map((category, index) => {
                            return (
                                <List.Accordion
                                    key={index}
                                    title={category.title}
                                    onPress={animation}
                                    left={props => <List.Icon {...props} color="#3787EE" icon={category.icon} />}
                                >
                                    {/* Second Level  */}
                                    {category?.subCategory1?.map((subCategory1, index) => {
                                        return (
                                            <List.Accordion
                                                key={index}
                                                className="bg-blue-200 border-b border-slate-400"
                                                onPress={animation}
                                                title={subCategory1.title}
                                                left={props => <List.Icon {...props} color="#3787EE" icon="plus" />}
                                            >
                                                {/* Third Level  */}
                                                {subCategory1?.subCategory2?.map((subCategory2, index) => {
                                                    return (
                                                        <List.Item
                                                            className="bg-blue-100"
                                                            left={props => <Text></Text>}
                                                            key={index}
                                                            title={subCategory2.title}
                                                            onPress={() => navigation.push("Category", { category: subCategory2.title })}
                                                        />
                                                    );
                                                })

                                                }
                                            </List.Accordion>
                                        )
                                    })

                                    }
                                </List.Accordion>
                            );
                        }
                        )}

                    </List.Section>
                </ScrollView>


                {/* RIGHT BAR  */}
                <Pressable
                    onPress={toggleSidebar}
                    className="absolute top-0 -right-[67%] w-[67%] h-full"
                />

            </Animated.View>

        </>
    )
}
export default SideBar;