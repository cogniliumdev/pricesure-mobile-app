import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Text,
    Animated
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import HomeCategoriesBar from "../components/HomeCategoriesBar"
import HomeSlider from '../components/HomeSlider';
import AdsSection from '../components/AdsSection';
import Header from '../components/Header';

import CollectionsSection from '../components/CollectionsSection';
import { useGetElasticDataMutation } from "../api/pricesureApi.js"


const Home = ({ navigation }) => {

    const [getElasticData, getElasticData_Obj] = useGetElasticDataMutation();
    const [discountedProducts, setDiscountedProducts] = useState();
    const [productsByDomain, setProductsByDomain] = useState();

    //get called on screen loads
    // useEffect(() => {

    //     ss();
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         getDataFromDB();
    //     });
    //     return unsubscribe;
    // }, [navigation]);

    // //get data from DB

    // const getDataFromDB = () => {



    useEffect(() => {
        getDiscountedProducts();
        getProductsByDomain();
    }, [navigation]);

    const getDiscountedProducts = async () => {
        try {
            // configure searchkit obj 
            const res = await getElasticData({
                discountFilter: { minDiscount: 5, maxDiscount: 80 },
                vendorFilter: ["EMILY"],
                hits: ["discount", "vendor", "price", "title", "price_before_sale", "image"],
                hitsSize: 4
            });
            setDiscountedProducts(res.data.hits);
            // console.log(util.inspect(res.data.hits, { showHidden: true, depth: null, colors: true }));
        }
        catch (err) {
            console.log(err);
        }
    }

    const getProductsByDomain = async () => {
        try {
            // configure searchkit obj 
            const res = await getElasticData({
                discountFilter: { minDiscount: 5, maxDiscount: 80 },
                domainFilter: ["secretstash.pk"],
                hits: ["discount", "domain", "title", "price", "price_before_sale", "product_url", "image"],
                hitsSize: 4
            });
            setProductsByDomain(res.data.hits);
            // console.log(util.inspect(res.data.hits, { showHidden: true, depth: null, colors: true }));
        } catch (err) {
            console.log(err)
        }
    }

    // show ? "translate-x-0" : "-translate-x-72"
    return (<>

        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
            }}>

            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

            <Header navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false}>


                {/* categories bar  */}
                <View className="mt-2">
                    <HomeCategoriesBar navigation={navigation} />
                </View>

                {/* HomeSlider */}
                <View className="mt-4">
                    <HomeSlider />
                </View>

                {/* Ads. Section  */}
                <View className="mt-6">
                    <AdsSection
                        data={discountedProducts}
                        title={"Ads"}
                        navigation={navigation}
                    />
                </View>

                {/* DEALS OF THE DAY Section  */}
                <View className="mt-4">
                    <AdsSection
                        data={productsByDomain}
                        title={"DEALS OF THE DAY"}
                        navigation={navigation}
                    />
                </View>

                {/* Collections Section  */}
                <View className="mt-6">
                    <CollectionsSection navigation={navigation} title={"COLLECTIONS"} />
                </View>

                <View className="mt-24">
                    <View />
                </View>

            </ScrollView>
        </View>
    </>
    );
};
export default Home;