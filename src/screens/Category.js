import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { COLOURS, Items } from '../../database/Database';
import ProductCard from "../components/ProductCard"
import FilterBar from "../components/FilterBar"
import Header from '../components/Header';
import { useGetElasticDataMutation } from "../api/pricesureApi.js"
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const Category = ({ navigation, route }) => {

    const searchFilters = route?.params;
    const [products, setProducts] = useState([]);
    const [productsNumber, setProductsNumber] = useState([]);
    const [aggregations, setAggregations] = useState({ facets: null, summary: null });
    const [vendorFiltersList, setVendorFiltersList] = useState(searchFilters.vendor ? [searchFilters.vendor] : []);
    const [domainFiltersList, setDomainFiltersList] = useState(searchFilters.domain ? [searchFilters.domain] : []);
    const [categoryFiltersList, setCategoryFiltersList] = useState(searchFilters.category ? [searchFilters.category] : []);

    const [getElasticData, getElasticData_Obj] = useGetElasticDataMutation();


    const elasticQueryObj = {
        hits: ["discount", "vendor", "price", "title", "price_before_sale", "image", "domain"],
        hitsSize: 50,
        categoryFilter: [].concat(categoryFiltersList),
        vendorFilter: [].concat(vendorFiltersList),
        domainFilter: [].concat(domainFiltersList)
    }

    if (searchFilters?.searchQuery) {
        elasticQueryObj.searchQuery = searchFilters?.searchQuery;
    }
    // if (searchFilters?.category) {
    //     elasticQueryObj.categoryFilter.push(searchFilters?.category);
    // }
    // if (searchFilters?.domain) {
    //     elasticQueryObj.domainFilter.push(searchFilters?.domain);
    // }
    // if (searchFilters?.vendor) {
    //     elasticQueryObj.vendorFilter.push(searchFilters.vendor);
    // }



    const getProducts = async () => {
        try {
            const res = await getElasticData(elasticQueryObj);
            // console.log(util.inspect(res.data.hits.items, {showHidden:true}))
            console.log(JSON.stringify(res.data?.summary?.appliedFilters, null, 1));
            setProducts(res.data.hits);
            setProductsNumber(res.data.hits.items.length);
            setAggregations({ facets: res.data.facets, summary: res.data.summary });

            // Vendor Filters 
            res.data?.summary?.appliedFilters?.forEach((filter) => {
                if (filter.identifier == "vendor") {
                    setVendorFiltersList((prevState) => {
                        if (prevState.includes(filter.value)) {
                            return prevState;
                        } else {
                            return prevState.concat(filter.value)
                        }
                    });
                }
            })

            // Domain Filters 
            res.data?.summary?.appliedFilters?.forEach((filter) => {
                if (filter.identifier == "domain") {
                    setDomainFiltersList((prevState) => {
                        if (prevState.includes(filter.value)) {
                            return prevState;
                        } else {
                            return prevState.concat(filter.value)
                        }
                    });
                }
            })

            // Category Filters 
            res.data?.summary?.appliedFilters?.forEach((filter) => {
                if (filter.identifier == "category") {
                    setCategoryFiltersList((prevState) => {
                        if (prevState.includes(filter.value)) {
                            return prevState;
                        } else {
                            return prevState.concat(filter.value)
                        }
                    });
                }
            })

        } catch (err) {
            console.log(err)
        }
    };


    const addVendorFilter = (val) => {
        setVendorFiltersList((prevVal) => {
            if (prevVal.includes(val)) {
                return prevVal;
            }
            else {
                return prevVal.concat(val);
            }
        })
    };
    const removeVendorFilter = (val) => {
        setVendorFiltersList((prevState) => {
            return prevState.filter((item) => {
                if (item !== val) return item;
            })
        })
    }


    const addCategoryFilter = (val) => {
        setCategoryFiltersList((prevVal) => {
            if (prevVal.includes(val)) {
                return prevVal;
            }
            else {
                return prevVal.concat(val);
            }
        })
    };
    const removeCategoryFilter = (val) => {
        setCategoryFiltersList((prevState) => {
            return prevState.filter((item) => {
                if (item !== val) return item;
            })
        })
    }


    const addDomainFilter = (val) => {
        setDomainFiltersList((prevVal) => {
            if (prevVal.includes(val)) {
                return prevVal;
            }
            else {
                return prevVal.concat(val);
            }
        })
    };
    const removeDomainFilter = (val) => {
        setDomainFiltersList((prevState) => {
            return prevState.filter((item) => {
                if (item !== val) return item;
            });
        });
    }


    useEffect(() => {
        getProducts();
    }, [
        navigation,
        elasticQueryObj?.searchQuery,
        searchFilters?.searchQuery,
    ]);

    useEffect(() => {
        getProducts();
    }, [
        vendorFiltersList,
        domainFiltersList,
        categoryFiltersList,
    ]);

    console.log("elastic query OBJ", elasticQueryObj.vendorFilter);
    console.log("vendor state", vendorFiltersList);

    return (<>
        <View
            style={{
                width: '100%',
                height: '100%',
                backgroundColor: COLOURS.white,
            }}>

            <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />

            <Header navigation={navigation} />

            <FilterBar
                setVendorFiltersList={setVendorFiltersList}
                addVendorFilter={addVendorFilter}
                addDomainFilter={addDomainFilter}
                addCategoryFilter={addCategoryFilter}
                aggregations={aggregations}
            />


            {/* vendors filter bar  */}
            {vendorFiltersList.length !== 0 ?
                <View className="flex-row px-2 gap-2 justify-start items-center py-1">
                    <Text>Vendor:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {
                                vendorFiltersList?.map((filter, index) => {
                                    return (<TouchableOpacity
                                        className="flex-row justify-center items-center  rounded border-2 border-green-500 px-2"
                                        onPress={() => removeVendorFilter(filter)}
                                    >
                                        <Text
                                            key={index}
                                            className="mr-2"
                                        >
                                            {filter}
                                        </Text>
                                        <FontAwesome name="close" color={"green"} size={15} />
                                    </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View> : null
            }

            {/* domain filter bar  */}
            {domainFiltersList.length !== 0 ?
                <View className="flex-row px-2 gap-2 justify-start items-center py-1">
                    <Text>Domain:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {
                                domainFiltersList?.map((filter, index) => {
                                    return (<TouchableOpacity
                                        className="flex-row justify-center items-center  rounded border-2 border-green-500 px-2"
                                        onPress={() => removeDomainFilter(filter)}
                                    >
                                        <Text
                                            key={index}
                                            className="mr-2"
                                        >
                                            {filter}
                                        </Text>
                                        <FontAwesome name="close" color={"green"} size={15} />
                                    </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View> : null
            }

            {/* domain filter bar  */}
            {categoryFiltersList.length !== 0 ?
                <View className="flex-row px-2 gap-2 justify-start items-center py-1">
                    <Text>Category:</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row gap-2">
                            {
                                categoryFiltersList?.map((filter, index) => {
                                    return (<TouchableOpacity
                                        className="flex-row justify-center items-center  rounded border-2 border-green-500 px-2"
                                        onPress={() => removeCategoryFilter(filter)}
                                    >
                                        <Text
                                            key={index}
                                            className="mr-2"
                                        >
                                            {filter}
                                        </Text>
                                        <FontAwesome name="close" color={"green"} size={15} />
                                    </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                    </ScrollView>
                </View> : null
            }

            {/* <View className="w-full px-2 mt-4">
                <TouchableOpacity
                    className="rounded px-2 pb-1 w-20 bg-blue-500 flex-row justify-center items-center "
                    onPress={getProducts}
                >
                    <Text className="text-white text-sm">search</Text>
                </TouchableOpacity>
            </View> */}

            <ScrollView showsVerticalScrollIndicator={false}>
                <View
                    style={{
                        marginBottom: 10,
                        padding: 16,
                    }}>
                    {searchFilters?.searchQuery &&
                        <Text
                            style={{
                                fontSize: 19,
                                color: COLOURS.black,
                                fontWeight: '500',
                                letterSpacing: 1,
                                marginBottom: 10,
                            }}>
                            Search: {searchFilters?.searchQuery}
                        </Text>}

                </View>

                <View
                    style={{
                        padding: 16,
                    }}>
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: COLOURS.black,
                                    fontWeight: '500',
                                    letterSpacing: 1,
                                }}
                            >
                                Products
                            </Text>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: COLOURS.black,
                                    fontWeight: '400',
                                    opacity: 0.5,
                                    marginLeft: 10,
                                }}>
                                {productsNumber}
                            </Text>
                        </View>

                    </View>
                </View>

                {
                    getElasticData_Obj.isLoading ?
                        <View className="items-center"><Text>LOADING...</Text></View>
                        :
                        <View
                            style={{
                                padding: 16,
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    justifyContent: 'space-around',
                                }}>
                                {products.items?.map((data, index) => {
                                    return <ProductCard data={data} key={index} navigation={navigation} />;
                                })}
                            </View>
                        </View>
                }
            </ScrollView>
        </View>
    </>
    );
};
export default Category;