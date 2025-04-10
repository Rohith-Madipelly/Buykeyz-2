import { Alert, StyleSheet } from 'react-native'
import RazorpayCheckout from 'react-native-razorpay';
import { PAYOUT_VERIFY_ORDER_API } from '../../network/ApiCalls';

const RazorPayModule = async (amount, order, tokken, navigation,key) => {
    // const toast =useToast()
    console.log(
        "cmsh", order
    )
    try {
        if (order) {
            const options = {
                key: key,
                order_id: order.id,
                amount: 90000,
                currency: order.currency,
                name: order.entity,
                prefill: {
                    name: "Test User",
                    email: "madipellyrohith@gmail.com",
                    contact: "9951072023",
                },
                notes: {
                    address: "11-24-140,2nd",
                },
                theme: {
                    color: "#3399cc",
                },
            }
            setTimeout(() => {
                RazorpayCheckout.open(options)
                    .then((data) => {
                        console.log("Payment >", data)
                        verifySignature(data, tokken, navigation)

                        return data
                    })
                    .catch((error) => {
                        console.log("Error in RazorpayCheckout", error, error.response)
                    })

            }, 2000);
        }

    } catch (error) {
        console.log(error.response)
    }
}

export const verifySignature = async (paymentData, tokenn, navigation) => {
    // let tokenn = useSelector((state) => state.login.token);


    console.log("havcjhvaj", tokenn)
    try {
        const res = await PAYOUT_VERIFY_ORDER_API(paymentData, tokenn);
        console.log("dcbs", res.data)
        if (res?.data.message) {
            console.log(res.data.message)
            setTimeout(() => {
                // Alert.alert("Payment Done")
                // toast.show(res.data.message)
                setTimeout(() => {
                    navigation.navigate("PlaceOrderSuccessfully", { message: `${res.data.message}` })
                }, 200);
            }, 200);
        }
    } catch (error) {
        console.error(">>>>", error.response.data.message)
        setTimeout(() => {
            Alert.alert("PaymentFailed")
        }, 2000);
        if (error.response.status === 401) {
            console.error(">>>>", error.response.data.message)
        }
        // setFormError("Something went wrong.");

    }
};



export default RazorPayModule

const styles = StyleSheet.create({})



// Working fine