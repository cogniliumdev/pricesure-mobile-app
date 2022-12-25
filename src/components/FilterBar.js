import { View, Text, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { Link } from "@react-navigation/native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState } from "react";


const FilterBar = ({ aggregations, addVendorFilter, addDomainFilter, addCategoryFilter }) => {
    const [showVendor, setShowVendor] = useState(false);
    const [showDomain, setShowDomain] = useState(false);
    const [showCategory, setShowCategory] = useState(false);

    let vendorList = [];
    let filterVendorValues = [];

    aggregations?.summary?.appliedFilters?.forEach((filter) => {
        if (filter.identifier == "vendor") {
            filterVendorValues.push(filter.value);
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "vendor") {
            facet.entries.forEach((entry) => {
                if (filterVendorValues.includes(entry.label)) {
                    vendorList.push(entry);
                }
            })
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "vendor") {
            facet.entries.forEach((entry) => {
                if (!filterVendorValues.includes(entry.label) && entry.label !== "") {
                    vendorList.push(entry);
                }
            })
        }
    });


    let categoryList = [];
    let filterCategoryValues = [];

    aggregations?.summary?.appliedFilters?.forEach((filter) => {
        if (filter.identifier == "category") {
            filterCategoryValues.push(filter.value);
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "category") {
            facet.entries.forEach((entry) => {
                if (filterCategoryValues.includes(entry.label)) {
                    categoryList.push(entry);
                }
            })
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "category") {
            facet.entries.forEach((entry) => {
                if (!filterCategoryValues.includes(entry.label) && entry.label !== "") {
                    categoryList.push(entry);
                }
            })
        }
    });

    let domainList = [];
    let filterDomainValues = [];

    aggregations?.summary?.appliedFilters?.forEach((filter) => {
        if (filter.identifier == "domain") {
            filterDomainValues.push(filter.value);
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "domain") {
            facet.entries.forEach((entry) => {
                if (filterDomainValues.includes(entry.label)) {
                    domainList.push(entry);
                }
            })
        }
    });
    aggregations?.facets?.forEach((facet) => {
        if (facet.identifier == "domain") {
            facet.entries.forEach((entry) => {
                if (!filterDomainValues.includes(entry.label) && entry.label !== "") {
                    domainList.push(entry);
                }
            })
        }
    });


    // console.log(JSON.stringify(aggregations.facets[1]?.entries.slice(0,3), null, 1));
    // console.log(JSON.stringify(categoryList, null, 1));
    // console.log(JSON.stringify(aggregations?.summary?.appliedFilters, null, 1));
    // console.log(JSON.stringify(filterCategoryValues, null, 1));

    return (<View style={{ position: "relative" }}>
        <View className="h-11 mt-1 pb-1 border-b-4 border-slate-300">
            {/* FilterBar */}
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View className="w-full flex-row justify-between items-center gap-2 px-2">
                    <Pressable
                        android_ripple={{ color: "slate-200" }}
                        className={`flex-row justify-center items-center ${showVendor ? `bg-slate-300` : `bg-white`} px-2 py-1 rounded-lg border border-slate-300`}
                        onPress={() => setShowVendor(!showVendor)}
                    >
                        <Text className="mr-2">Vendor</Text>
                        {
                            !showVendor ?
                                <FontAwesome name="angle-up" color={"black"} size={15} />
                                :
                                <FontAwesome name="angle-down" color={"black"} size={15} />
                        }
                    </Pressable>

                    <Pressable
                        android_ripple={{ color: "slate-200" }}
                        className={`flex-row justify-center items-center ${showDomain ? `bg-slate-300` : `bg-white`} px-2 py-1 rounded-lg border border-slate-300`}
                        onPress={() => setShowDomain(!showDomain)}
                    >
                        <Text className="mr-2">Domains</Text>
                        {
                            !showDomain ?
                                <FontAwesome name="angle-up" color={"black"} size={15} />
                                :
                                <FontAwesome name="angle-down" color={"black"} size={15} />
                        }
                    </Pressable>

                    <Pressable
                        android_ripple={{ color: "slate-200" }}
                        className={`flex-row justify-center items-center ${showCategory ? `bg-slate-300` : `bg-white`} px-2 py-1 rounded-lg border border-slate-300`}
                        onPress={() => setShowCategory(!showCategory)}
                    >
                        <Text className="mr-2">Category</Text>
                        {
                            !showCategory ?
                                <FontAwesome name="angle-up" color={"black"} size={15} />
                                :
                                <FontAwesome name="angle-down" color={"black"} size={15} />
                        }
                    </Pressable>
                </View>
            </ScrollView>
        </View>

        {/* dropdown container */}
        <View
            style={{ zIndex: 1000, position: "absolute", top: 51 }}
            className="w-full justify-center items-center bg-white"
        >
            {
                showVendor ?
                    <View className=" shadow-sm w-[95%] px-2 pb-2 rounded-md">
                        {vendorList?.slice(0, 5)?.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        addVendorFilter(item.label);
                                        setShowVendor(!showVendor);
                                    }}
                                    key={index}
                                    android_ripple={{ color: "slate-200" }}
                                    className="flex-row justify-between items-center w-full h-8 border-b border-slate-300"
                                >
                                    <Text>{item.label}</Text>
                                    <Text className="rounded bg-blue-500 px-1 text-white">{item.count}</Text>
                                </Pressable>
                            )
                        })}
                    </View> : null
            }
            {
                showCategory ?
                    <View className=" shadow-sm w-[95%] px-2 pb-2 rounded-md">
                        {categoryList?.slice(0, 5)?.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        addCategoryFilter(item.label);
                                        setShowCategory(!showCategory);
                                    }}
                                    key={index}
                                    android_ripple={{ color: "slate-200" }}
                                    className="flex-row justify-between items-center w-full h-8 border-b border-slate-300"
                                >
                                    <Text>{item.label}</Text>
                                    <Text className="rounded bg-blue-500 px-1 text-white">{item.count}</Text>
                                </Pressable>
                            )
                        })}
                    </View> : null
            }
            {
                showDomain ?
                    <View className="w-[95%] px-2 pb-2 rounded-md shadow-sm">
                        {domainList?.slice(0, 5)?.map((item, index) => {
                            return (
                                <Pressable
                                    onPress={() => {
                                        addDomainFilter(item.label);
                                        setShowDomain(!showDomain);
                                    }}
                                    key={index}
                                    android_ripple={{ color: "slate-200" }}
                                    className="flex-row justify-between items-center w-full h-8 border-b border-slate-300"
                                >
                                    <Text>{item.label}</Text>
                                    <Text className="rounded bg-blue-500 px-1 text-white">{item.count}</Text>
                                </Pressable>
                            )
                        })}
                    </View> : null
            }
        </View>
    </ View>
    )
}

export default FilterBar;