import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../screens/Home";
import ProductInfo from "../screens/ProductInfo";
import MyCart from "../screens/MyCart"; 
import Category from "../screens/Category"; 

const Stack = createNativeStackNavigator();


const Navigation = () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{ 
                        // header:()=> <Header/> ,
                        headerShown: false
                    }}
                    initialRouteName="Home"
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen name="Category" component={Category} />
                    <Stack.Screen name="ProductInfo" component={ProductInfo} />
                    <Stack.Screen name="MyCart" component={MyCart} />
                </Stack.Navigator>
            </NavigationContainer>

        </>
    )
}


export default Navigation;