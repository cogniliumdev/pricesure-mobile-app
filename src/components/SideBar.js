import { View, Text, Animated, TouchableOpacity, Pressable } from "react-native";
import { useState, useRef, useEffect } from "react";

const SideBar = ({ handelToggleSidebar }) => {
    const [show, setShow] = useState(false);

    const fadeAnime = useRef(new Animated.Value(-500)).current;

    const toggleSidebar = () => {
        Animated.timing(fadeAnime, {
            toValue: show ? 0 : -500,
            duration: 200, // ms
            useNativeDriver: true
        }).start();

        setShow(!show)
    }

    useEffect(() => {
        toggleSidebar();
    }, [handelToggleSidebar]);


    return (
        <>
            <Animated.View
                className={`absolute top-0 left-0 z-50 w-[60%] h-full bg-slate-50 shadow-2xl`}
                style={{
                    transform: [{
                        // translateX: show ? 0 : -290
                        translateX: fadeAnime
                    }]
                }}
            >
                <TouchableOpacity className="p-3"
                    onPress={toggleSidebar}
                >
                    <Text>X</Text>
                </TouchableOpacity>

                <Pressable
                    onPress={toggleSidebar}
                    className="absolute top-0 -right-[67%] w-[67%] h-full"
                />

            </Animated.View>

        </>
    )
}
export default SideBar;