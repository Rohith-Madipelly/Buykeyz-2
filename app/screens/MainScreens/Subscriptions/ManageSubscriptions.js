import { Alert, FlatList, ImageBackground, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { GET_ALL_MY_Subscriptions } from '../../../network/ApiCalls'
import GlobalStyles from '../../../components/UI/config/GlobalStyles'
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar'
import CustomToolKitHeader from '../../../components/UI/CustomToolKitHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FlashList } from '@shopify/flash-list'



const ManageSubscriptions = () => {

    const [spinnerBool, setSpinnerbool] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [APIData, setAPIData] = useState([])

    const navigation = useNavigation()
    let tokenn = useSelector((state) => state.login.token);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState(APIData);

    // Filter data based on search query
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setFilteredData(APIData);
        } else {
            const lowercasedQuery = searchQuery.toLowerCase();
            const filtered = APIData.filter(item =>
                item?.name?.toLowerCase().includes(lowercasedQuery)
            );
            setFilteredData(filtered);
        }
    }, [searchQuery, APIData]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiCaller()
    }, []);




    useFocusEffect(
        useCallback(() => {
            setTimeout(() => {
                ApiCaller()
            }, 2000);
        }, [])
    )


    const ApiCaller = async () => {
        try {
            //   setSpinnerbool(true)
            const res = await GET_ALL_MY_Subscriptions(tokenn)
            if (res.data) {
                setAPIData(res.data.userSubscriptions)
            }
        } catch (error) {
            console.log(error)

            if (error.response) {
                if (error.response.status === 400) {
                    Alert.alert(error.response.data.message)
                    //   console.log(error.response.data.message)
                }
                else if (error.response.status === 401) {
                    Alert.alert(error.response.data.message, "Try to login again")
                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 429) {
                    // Alert.alert(error.response.data.message,"Contact support")

                    Alert.alert(error.response.data.message, "Contact support", [

                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                        },
                        {
                            text: 'Continue to next page',
                            onPress: () => {
                                // PageHandler(3,dispatch)
                                navigation.navigate("VerificationCodePhoneNumber")
                            },
                        },
                        // { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ])


                    //   seterrorFormAPI({ PasswordForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 404) {
                    //   seterrorFormAPI({ emailForm: `${error.response.data.message}` })
                }
                else if (error.response.status === 500) {
                    console.log("Internal Server Error", error.message)
                }
                else {
                    console.log("An error occurred response.>>", error.message)
                    console.log("Outofboxerror", error.response.data.message)

                    //   ErrorResPrinter(`${error.message}`)
                }
            }
            else if (error.code === 'ECONNABORTED') {
                console.log('Request timed out. Please try again later.');
            }
            else if (error.request) {
                console.log("No Response Received From the Server.")
                if (error.request.status === 0) {
                    // console.log("error in request ",error.request.status)
                    //   Alert.alert("No Network Found", "Please Check your Internet Connection")
                }
            }

            else {
                console.log("Error in Setting up the Request.")
            }
        }
        finally {

            setTimeout(() => {
                setSpinnerbool(false)
            }, 50);

            setTimeout(() => {
                setRefreshing(false);
            }, 50)
        }
    }


    const insets = useSafeAreaInsets();

    const renderItem = ({ item, index }) => {
        const statusStyle = item.status === 'active' ? styles.activeStatus : styles.cancelledStatus;
        const statusText = item.status === 'active' ? 'Active' : 'Cancelled';
        return (
            <View
                key={index}
                onPress={() => {
                    // Handle subscription details on press
                }}
                style={styles.subscriptionItem}
            >
                <View style={[styles.subscriptionHeader, { flexDirection: 'column' }]}>
                    <Text style={styles.planTitle}>Plan ID: {item.plan_id}</Text>
                    <Text style={[styles.statusText, statusStyle, { marginTop: 10, width: "30%", textAlign: 'center', alignSelf: 'flex-end' }]}>{statusText}</Text>
                </View>
                <View style={styles.subscriptionBody}>
                    <Text style={styles.subscriptionDetails}>Subscription ID: {item.id}</Text>
                    <Text style={styles.subscriptionDetails}>Remaining Count: {item.remaining_count}</Text>
                    <Text style={styles.subscriptionDetails}>Paid Count: {item.paid_count}</Text>
                    <Text style={styles.subscriptionDetails}>Start Date: {new Date(item.start_at * 1000).toLocaleDateString()}</Text>
                    <Text style={styles.subscriptionDetails}>End Date: +{new Date(item.end_at * 1000).toLocaleDateString()}</Text>
                </View>
                <View style={[styles.subscriptionFooter, {}]}>
                    <TouchableOpacity onPress={() => { navigation.navigate('ViewInvoicesSubscriptions', { id: item.id }) }}>
                        <Text style={styles.viewDetailsButton}>View Invoices</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };



    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                <CustomToolKitHeader componentName={"Manage Subscriptions"} backgroundColor={GlobalStyles.AppBackground} />


                <ScrollView
                    contentContainerStyle={{ backgroundColor: GlobalStyles.AppBackground }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >

                    <View style={{ paddingHorizontal: 10 }}>

                        <FlashList
                            data={filteredData}
                            // numColumns={2}
                            // refreshControl={
                            //     <RefreshControl
                            //         refreshing={refreshing}
                            //         onRefresh={onRefresh}
                            //     />
                            // }
                            renderItem={renderItem}
                            renderItemw={({ item, index }) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => {
                                        selectedPlan(item)
                                        // setSelectEMIPlan(item)
                                    }}
                                    style={{
                                        flex: 1,
                                        margin: 10,
                                        padding: 15,
                                        // backgroundColor: '#f0f0f0',
                                        borderRadius: 10,
                                        borderWidth: 1.3,
                                        borderColor: '#4A3AFF'
                                    }}
                                >
                                    <Text style={{ color: '#4A3AFF', fontWeight: 700, textAlign: 'center' }}>{item.name}</Text>
                                    <View style={{ padding: 15, marginTop: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}>
                                        {/* <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Plan Details:</Text> */}
                                        {/* <Text style={{ fontSize: 16, marginVertical: 5 }}>Name: {item.name}</Text> */}
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Amount:</Text> {item.currency} {item.monthlyAmount}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Duration:</Text> {item.totalPlanDuration} months</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Status:</Text> {item.status}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Remaining Payments:</Text> {item.remaining_count}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Paid Payments:</Text> {item.paid_count}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Total Payments:</Text> {item.total_count}</Text>
                                        <Text style={{ fontSize: 16, marginVertical: 5 }}><Text style={{ fontWeight: 700 }}>Payments Method:</Text> {item.payment_method}</Text>



                                    </View>
                                </TouchableOpacity>
                            )}

                            ListEmptyComponent={(
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 100 }}>
                                    <Text>No items found</Text>
                                </View>
                            )}
                            estimatedItemSize={50}
                        />

                    </View>
                    <View>


                    </View>
                </ScrollView>
            </View>
        </View>


    )
}

export default ManageSubscriptions

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',

        // alignItems: 'center',
        // justifyContent: 'center',
    },


    subscriptionItem: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    subscriptionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    planTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    statusText: {
        fontSize: 14,
        fontWeight: '600',
    },
    activeStatus: {
        color: 'green',
        backgroundColor: "green",
        color: "white",
        paddingHorizontal: 7,
        paddingVertical: 3,
        fontWeight: '800',
        borderRadius: 5
    },
    cancelledStatus: {
        color: 'red',
        backgroundColor: "red",
        color: "white",
        paddingHorizontal: 7,
        paddingVertical: 3,
        fontWeight: '800',
        borderRadius: 5,

        // position:'absolute',
        // top:-10,
        // right:-10
    },
    subscriptionBody: {
        marginBottom: 15,
    },
    subscriptionDetails: {
        fontSize: 14,
        color: '#555',
        marginVertical: 3,
    },
    subscriptionFooter: {
        marginTop: 10,
        alignItems: 'center',
    },
    viewDetailsButton: {
        fontSize: 14,
        color: '#007BFF',
        fontWeight: 'bold',
    },
})