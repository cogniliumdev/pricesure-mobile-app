import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import { Link } from '@react-navigation/native';



const ProductCard = ({ data, navigation }) => {

    const { discount, domain, vendor, price, title, price_before_sale, image } = data?.fields;

    return (
        <TouchableOpacity
            // to={{screen:"ProductInfo",  params: { productID: data.id } }}
            onPress={() => navigation.navigate('ProductInfo', { productData: data })}
            style={{
                width: '48%',
                marginVertical: 14,
            }}>

            <View
                style={{
                    width: '100%',
                    height: 100,
                    borderRadius: 10,
                    backgroundColor: COLOURS.backgroundLight,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                }}>
                {discount ? (
                    <View
                        style={{
                            position: 'absolute',
                            width: '20%',
                            height: '24%',
                            backgroundColor: COLOURS.green,
                            top: 0,
                            left: 0,
                            borderTopLeftRadius: 10,
                            borderBottomRightRadius: 10,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.white,
                                fontWeight: 'bold',
                                letterSpacing: 1,
                            }}>
                            {discount}%
                        </Text>
                    </View>
                ) : null}
                <Image
                    source={{ uri: image }}
                    style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain',
                    }}
                />
            </View>
            <Text
                style={{
                    fontSize: 13,
                    color: COLOURS.black,
                    fontWeight: '600',
                    marginBottom: 2,
                }}>
                {title.slice(0, 40)}...
            </Text>

            <Text className="text-xs font-semibold text-slate-500">
                {domain}
            </Text>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>

                <Text
                    style={{
                        fontSize: 12,
                        color: COLOURS.green,
                    }}>
                    {vendor}
                </Text>
            </View>
            <View className="flex-row gap-2">
                {discount ?
                    <>
                        <Text className="text-xs text-black line-through decoration-solid">Rs{price_before_sale}</Text>
                        <Text className="font-bold text-xs text-red-500">Rs{price}</Text>
                    </> :
                    <Text className="font-bold text-xs text-red-500">Rs{price}</Text>
                }
            </View>

        </TouchableOpacity>
    );
};


export default ProductCard;