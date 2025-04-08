import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    SafeAreaView,
    Linking,
    RefreshControl,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../../components/UI/config/GlobalStyles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GET_Invoices } from '../../../network/ApiCalls';
import CustomStatusBar from '../../../components/UI/CustomStatusBar/CustomStatusBar';
import CustomToolKitHeader from '../../../components/UI/CustomToolKitHeader';

const ViewInvoicesSubscriptions = ({ route }) => {
    const [spinnerBool, setSpinnerbool] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const id = route?.params?.id;
    const token = useSelector((state) => state.login.token);
    const navigation = useNavigation();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        ApiCaller();
    }, []);

    useEffect(() => {
        ApiCaller();
    }, []);

    const ApiCaller = async () => {
        try {
            setSpinnerbool(true);
            const res = await GET_Invoices(id, token);
            if (res.data) {
                setInvoiceDetails(res.data.invoiceDetails);
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to fetch invoice details.');
        } finally {
            setSpinnerbool(false);
            setRefreshing(false);
        }
    };

    const handleViewInvoice = (url) => {
        Linking.openURL(url);
    };

    if (!invoiceDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    const { items } = invoiceDetails;
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: GlobalStyles.AuthScreenStatusBar1.color }}>
            <CustomStatusBar barStyle={GlobalStyles.AuthScreenStatusBar1.barStyle} backgroundColor={GlobalStyles.AuthScreenStatusBar1.color} hidden={GlobalStyles.AuthScreenStatusBar1.hiddenSettings} />
            <View style={{ flex: 1, marginTop: insets.top, marginBottom: insets.bottom }}>
                {/* <CustomToolKitHeader componentName={"Subscriptions"} backgroundColor={GlobalStyles.AppBackground} /> */}
                <CustomToolKitHeader componentName="View Invoices" backgroundColor={GlobalStyles.AppBackground} />

                <ScrollView contentContainerStyle={styles.container}
                refreshControl={<RefreshControl
                    refreshing={refreshing}
                onRefresh={onRefresh}
                />}
                >
                    {items.map((invoice, index) => {
                        const { customer_details, line_items, status, amount_paid, currency_symbol, short_url } = invoice;
                        return (
                            <View key={index} style={styles.invoiceCard}>
                                {/* Customer Details */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Customer Details</Text>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Name:</Text>
                                        <Text>{customer_details.name}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Email:</Text>
                                        <Text>{customer_details.email}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Contact:</Text>
                                        <Text>{customer_details.contact}</Text>
                                    </View>
                                </View>

                                {/* Invoice Details */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Invoice Information</Text>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Invoice ID:</Text>
                                        <Text>{invoice.id}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Order ID:</Text>
                                        <Text>{invoice.order_id}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Status:</Text>
                                        <Text>{status === 'paid' ? 'Paid' : 'Pending'}</Text>
                                    </View>
                                    <View style={styles.detailsRow}>
                                        <Text style={styles.label}>Amount Paid:</Text>
                                        <Text>{currency_symbol} {amount_paid}</Text>
                                    </View>
                                </View>

                                {/* Line Items */}
                                <View style={styles.section}>
                                    <Text style={styles.sectionTitle}>Line Items</Text>
                                    {line_items.map((item, index) => (
                                        <View key={index} style={styles.lineItem}>
                                            <Text style={styles.itemTitle}>{item.name}</Text>
                                            <Text>{item.description}</Text>
                                            <Text>
                                                {item.quantity} x {item.amount} {currency_symbol}
                                            </Text>
                                            <Text>{item.billing_start}</Text>
                                            <Text>{item.billing_end}</Text>
                                        </View>
                                    ))}
                                </View>

                                {/* View Invoice Button */}
                                <TouchableOpacity
                                    style={styles.viewInvoiceButton}
                                    onPress={() => handleViewInvoice(short_url)}
                                >
                                    <Text style={styles.viewInvoiceButtonText}>View Invoice</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: GlobalStyles.AppBackground,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    invoiceCard: {
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    detailsRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        width: 100,
        color: '#555',
    },
    lineItem: {
        marginBottom: 10,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    viewInvoiceButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 15,
    },
    viewInvoiceButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ViewInvoicesSubscriptions;
