import { View, Text, Animated, TouchableOpacity, Pressable, LayoutAnimation, ScrollView } from "react-native";
import { useState, useRef, useEffect } from "react";
import { List } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const SideBar = ({ handelToggleSidebar }) => {
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

    const arr = [
        {
            title: "Electronic Devices",
            subCategory1: [
                {
                    title: "Smart Phones",
                    subCategory2: [
                        { title: "nokia mobiles" },
                        { title: "redmi mobiles" },
                        { title: "infinix mobiles" },
                    ]
                },
                {
                    title: "Laptops",
                    subCategory2: [
                        { title: "refurbished laptops" },
                        { title: "traditional laptops" },
                    ]
                },
                {
                    title: "Smart Watches",
                    subCategory2: [
                        { title: "smart watches" },
                    ]
                },

            ]
        },
        {
            title: "Health & Beauty",
            subCategory1: [
                {
                    title: "Fragrances",
                    subCategory2: [
                        { title: "women fragrances" },
                        { title: "men fragrances" },
                        { title: "unisex" },
                    ]
                },
                {
                    title: "Makeup",
                    subCategory2: [
                        { title: "foundation" },
                        { title: "makeup accessories" },
                        { title: "lips" },
                    ]
                },

            ]
        },
    ]


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
                        {arr?.map((category, index) => {
                            return (
                                <List.Accordion
                                    key={index}
                                    title={category.title}
                                    onPress={() => {
                                        LayoutAnimation.configureNext({
                                            duration: 100,
                                            create: { type: "linear", property: "opacity" },
                                            update: { type: "linear", springDamping: 0.4 },
                                            delete: { type: "linear", property: "opacity" }
                                        });
                                    }}
                                    left={props => <List.Icon {...props} color="blue" icon="face-woman" />}
                                >
                                    {/* Second Level  */}
                                    {category?.subCategory1?.map((subCategory1, index) => {
                                        return (
                                            <List.Accordion
                                                key={index}
                                                className="bg-blue-200 border-b border-slate-400"
                                                onPress={() => {
                                                    LayoutAnimation.configureNext({
                                                        duration: 100,
                                                        create: { type: "linear", property: "opacity" },
                                                        update: { type: "linear", springDamping: 0.4 },
                                                        delete: { type: "linear", property: "opacity" }
                                                    });
                                                }}
                                                title={subCategory1.title}
                                                left={props => <List.Icon {...props} color="blue" icon="plus" />}
                                            >
                                                {/* Third Level  */}
                                                {subCategory1?.subCategory2?.map((subCategory2, index) => {
                                                    return (
                                                        <List.Item
                                                            className="bg-blue-100"
                                                            left={props => <Text></Text>}
                                                            key={index}
                                                            title={subCategory2.title}
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