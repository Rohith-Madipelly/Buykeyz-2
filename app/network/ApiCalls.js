import axios from 'axios';


import { GUEST_URL } from '../Enviornment.js'


//Bank API res IFSC Code req Bank Details 
export const Bank_Details_on_IFSC = async (IFSC_CODE) => {
  return await axios.get(`https://ifsc.razorpay.com/${IFSC_CODE}`);
  // return await axios.get(`https://ifsc.razorpay.com/SBIN0021108`);
};


// Login API DONE
export const UserLoginApi = async (loginFormReq) => {
  console.log("jdbjh",loginFormReq)
  return await axios.post(`${GUEST_URL}/login`, loginFormReq)
}


// Register API DONE
export const UserRegisterOTPApi = async (registerFormReq) => {
  return await axios.post(`${GUEST_URL}/sendotp`, registerFormReq)
}

// RESEND OTP
export const resendRegisterOpt = async (token) => {

  return await axios.get(`${GUEST_URL}/resend`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// Verify OTP API
export const verifyOTPAPI = async (appReqData, token) => {
  return await axios.post(`${GUEST_URL}/verifyotp`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// CREATE PASSWORD
export const createPasswordAPI = async (appReqData, token) => {
  return await axios.post(`${GUEST_URL}/user/createpassword`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// SHOW AGREEMENT
export const showAgreementAPI = async (token) => {

  return await axios.get(`${GUEST_URL}/user/showagreement`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// AGREEMENT ACCEPT
export const agreementAcceptAPI = async (token) => {
  console.log("TOKEN", token)
  return await axios.get(`${GUEST_URL}/user/agreement`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// Send Forgot API FORGOT_PASSWORD_SEND_OTP
export const FORGOT_PASSWORD_SEND_OTP_API = async (data) => {
  const ReqData = {
    email: data.email
  }
  return await axios.post(`${GUEST_URL}/sendforgototp`, ReqData)
}


// Verify Forgot OTP API
export const FORGOT_PASSWORD_VEIRFY_OTP_API = async (email, values, token) => {
  const ReqData = {
    otp: values,
  }
  return await axios.post(`${GUEST_URL}/verifyforgototp`, ReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Verify Forgot OTP API
export const FORGOT_PASSWORD_RESEND_OTP_API = async (token) => {
  console.log("FORGOT_PASSWORD_RESEND_OTP_API 000000000",)

  return await axios.get(`${GUEST_URL}/resend`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// ForgotSetPasswordAPI

export const ForgotSetPasswordAPI = async (values, token) => {
  // console.log("ForgotSetPasswordAPI 000000000", email, values, token)
  const appReqData = {
    password: values.password
  }
  return await axios.post(`${GUEST_URL}/changepassword`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// // -------------------   MAIN PROFILE API   --------------------

// Profile USER_PROFILE_API
export const USER_PROFILE_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/profile`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// ADDRESS 
export const GET_ALL_ADDRESSES_API = async (token) => {
  console.log("token", token)
  return await axios.get(`${GUEST_URL}/user/address`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// ADD_ADDRESS_API
export const ADD_ADDRESS_LIST_API = async (appReqData, token) => {
  console.log("dfshv", token, appReqData)
  return await axios.post(`${GUEST_URL}/user/address`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const DELETE_ADDRESSES_API = async (id, token) => {
  console.log("token", token)
  return await axios.delete(`${GUEST_URL}/user/address/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// // -------------------   Main ADDRESS API   --------------------


// Update_ADDRESS_API
export const ADD_ADDRESS_API = async (appReqData, token) => {
  console.log("dfshv", token, appReqData)
  return await axios.patch(`${GUEST_URL}/user/address`, appReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}




// // -------------------   Main Screens API   --------------------



// Home Page
export const HomeAPI = async (token) => {
  return await axios.get(`${GUEST_URL}/user/home`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Home Page
export const Get_Notification_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/notifications`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
// GET_ALL_CATEGORIES
export const GET_ALL_CATEGORIES = async (token) => {
  return await axios.get(`${GUEST_URL}/user/categories`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


export const GET_CATEGORY_PRODUCTS = async (id, token) => {
  return await axios.get(`${GUEST_URL}/user/category/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const GET_SINGLE_PRODUCT = async (id, token) => {
  console.log("dchjvs", id)
  return await axios.get(`${GUEST_URL}/user/product/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const PAYOUT_CREATE_ORDER_API = async (apiReqData, token) => {
  console.log("Token ", apiReqData)
  return await axios.post(`${GUEST_URL}/user/createorder`, apiReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}





export const PAYOUT_VERIFY_ORDER_API = async (apiReqData, token) => {

  return await axios.post(`${GUEST_URL}/user/verifyorder`, apiReqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// All_products
export const ALL_PRODUCTS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/allproducts`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// ALL ORDERS TRANSACTIONS

export const ALL_ORDERS_TRANSACTIONS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/transactions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const ALL_ORDERS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const GET_IN_VOICE_API = async (orderId,token) => {
  return await axios.get(`${GUEST_URL}/invoicedownload/${orderId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// Change Password
export const CHANGE_OLD_PASSWORD_API = async (data, token, profileImage) => {
  const formData = new FormData();
  formData.append("fullName", data.fullName);
  formData.append("picture", data.picture);

  // Send the PATCH request with FormData and Authorization header
  return await axios.patch('https://api.buykeyz.com/v2/user/profile', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
}



// Change Password
export const UpdateProfilePic = async (profileImage, token,) => {


  console.log("sdjbkjsbc", profileImage)

  const formData = new FormData();

  formData.append('picture', {
    uri: profileImage,
    name: 'profileImageddd.png',
    type: 'image/jpg',
  });

  return await axios.patch('https://api.buykeyz.com/v2/user/profile', formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    }
  });
}


// -------------------   Account Verfification API   --------------------


// 1 send otp 
export const SendAadharOtpAPI = async (APIData, token) => {
  return await axios.post(`${GUEST_URL}/user/sendaadharotp`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// 1.2 verify otp VERIFY AADHAAR OTP
export const VerifyAadhaarOtpAPI = async (APIData, token) => {
  return await axios.post(`${GUEST_URL}/user/verifyaadharotp`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// 2.1 get PERSONAL DETAILS 

export const GET_PERSONAL_DETAILS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/personaldetails`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// 2.2 ADD PERSONAL DETAILS 
export const AddPersonalDetailsAPI = async (data, token) => {
  const formData = new FormData();



  // formData.append("address", data.address);
  // formData.append("area", data.area);
  // formData.append("dateOfBirth", data.dateOfBirth);
  // formData.append("district", data.district);
  // formData.append("firstName", data.firstName);
  // formData.append("lastName", data.lastName);
  formData.append("phoneNumber", data.phoneNumber);
  // formData.append("pinCode", data.pinCode);
  // formData.append("street", data.street);


  // const file = new File(
  //   [/* binary data here */],
  //   data.passPortPicture.name,
  //   { type: data.passPortPicture.mimeType }
  // );




  // formData.append("passPortPicture", file);



  // for (const [key, value] of Object.entries(data)) {
  //   if (key === 'passPortPicture') {
  //     // Assuming value contains binary data, name, and mimeType
  //     const file = new File(
  //       [value.binaryData],
  //       value.name,
  //       { type: value.mimeType }
  //     );
  //     console.log("passPortPicture", file);
  //     formData.append(key, file);
  //   } else {
  //     formData.append(key, value);
  //   }
  // }


  // console.log("sc",formData._parts[0].[passPortPicture])

  // Simple Process
  formData.append('passPortPicture', {
    uri: data.passPortPicture.uri,
    name: data.passPortPicture.name,
    type: data.passPortPicture.mimeType || 'application/octet-stream'
  });


  return await axios.post(`${GUEST_URL}/user/addpersonaldetails`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}



// 2.1 get PAN VERIFICATION 

export const GET_PAN_DETAILS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/verifypan`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// 3 PAN VERIFICATION
export const PanVerificationAPI2 = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifypan`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// 4 ELECTRICITY BILL VERIFICATION
export const ElectricityBillVerificationAPI = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifyelectricity`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// 5 ADD EMPLOYMENT TYPE 
export const AddEmploymentTypeAPI = async (APIData, token) => {
  // console.log(APIData)employmentType
  const DataAPI = {
    employmentType: "Salaried"
  }
  return await axios.post(`${GUEST_URL}/user/addemployment`, DataAPI, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}






// 6.1 GET EXECUTIVE Deatils
export const GET_SINGLE_EXECUTIVE_DETAILS = async (idNumber, token) => {
  return await axios.get(`${GUEST_URL}/user/executive`, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
    params: {
      idNumber: idNumber
    },
  })
}



// 6.2 ADDEXECUTIVEAPI
export const ADDEXECUTIVEAPI = async (data, token) => {
  return await axios.post(`${GUEST_URL}/user/executive`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}






// 7 ADD SALARY SLIP
export const AddSalarySlipAPI = async (result, token) => {
  const formData = new FormData();

  formData.append('salarySlip', {
    uri: result.uri,
    name: result.name,
    type: result.mimeType || 'application/octet-stream'
  })

  return await axios.post(`${GUEST_URL}/user/salaryslip`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}



// 8 BANK VERIFICATION
export const BankVerificationAPI = async (data, token) => {
  console.log("data>>", data)
  return await axios.post(`${GUEST_URL}/user/bank`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}







// user/createorder

// ACTIVE_LOANS_API
export const Lucky_Draws_Reward_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/luckydraws`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// ACTIVE_LOANS_API
export const RewardDetails_API = async (id, token) => {
  return await axios.get(`${GUEST_URL}/user/winners/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// Removed
export const ALL_CART_PRODUCTS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/cart`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// ACTIVE_LOANS_API
export const ACTIVE_LOANS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/loan`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// All Branches
export const ALL_BRANCHES_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/allstores`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// All Branches
export const PRIVACY_POLICY_API = async (token) => {
  return await axios.get(`${GUEST_URL}/privacypolicy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}
export const TERMS_AND_CONDITIONS_API = async (token) => {
  return await axios.get(`${GUEST_URL}/termsandconditions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

export const DELETE_ACCOUNT_POLICY_API = async (token) => {
  return await axios.get(`${GUEST_URL}/deleteaccountpolicy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



export const RETURN_AND_REFUND_POLICY_API = async (token) => {
  return await axios.get(`${GUEST_URL}/refundandreturnpolicy`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// SINGLE_BRANCH_ALL_ENTERPRISES_API
export const STORE_PRODUCTS_API = async (storeId, token) => {
  return await axios.get(`${GUEST_URL}/user/store/${storeId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// SINGLE_ENTERPRISE_ALL_PRODUCTS_API
export const SINGLE_ENTERPRISE_ALL_PRODUCTS_API = async (enterPriseId, token) => {
  return await axios.get(`${GUEST_URL}/user/products/${enterPriseId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// SINGLE_ENTERPRISE_ALL_PRODUCTS_API
export const SINGLE_PRODUCT_API = async (productId, token) => {
  return await axios.get(`${GUEST_URL}/user/product/${productId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// APPLY_PRODUCT_LOAN_API
export const APPLY_PRODUCT_LOAN_API = async (reqData, token) => {
  return await axios.post(`${GUEST_URL}/user/product`, reqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}





// APPLY_PRODUCT_LOAN_API
export const LOAN_CALCULATOR_API = async (reqData, token) => {
  return await axios.post(`${GUEST_URL}/user/calculator`, reqData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}






// Update Bank Profile
export const UPDATE_BANK_DETAILS_API = async (formData, token) => {
  return await axios.put(`${GUEST_URL}/user/bank`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// GET_ALL_CATEGORIES
export const GET_ALL_EMI_PLANS = async (token) => {
  return await axios.get(`${GUEST_URL}/user/plans`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// allsubscriptions
export const GET_ALL_MY_Subscriptions = async (token) => {
  return await axios.get(`${GUEST_URL}/user/allsubscriptions`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// allsubscriptions
export const GET_Invoices = async (id, token) => {
  return await axios.get(`${GUEST_URL}/user/invoice/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// GET_ALL_CATEGORIES
export const GET_CHECKIN_API = async (token) => {
  return await axios.get(`${GUEST_URL}/user/checkin`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// SUBSCRIBE TO A PLAN
export const SUBSCRIBE_TO_A_PLAN = async (planId, token) => {

  return await axios.get(`${GUEST_URL}/user/subscribeorder/${planId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// V2 1 ADD PERSONAL DETAILS 
export const ADDPERSONALDETAILS_API = async (data, token) => {
  const formData = new FormData();

  formData.append("fullName", data.fullName);
  formData.append("dateOfBirth", data.dateOfBirth);
  formData.append("district", data.district);
  formData.append("address", data.address);
  formData.append("street", data.street);
  formData.append("area", data.area);
  formData.append("pincode", data.pincode);


  formData.append('passPortPicture', {
    uri: data.passPortPicture.uri,
    name: data.passPortPicture.name,
    type: data.passPortPicture.mimeType || 'application/octet-stream'
  });


  return await axios.post(`${GUEST_URL}/user/personaldetails`, formData, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  })
}


// V2 2 PAN VERIFICATION
export const PanVerificationAPI = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifypan`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}



// V2 3 BANK VERIFICATION
export const verifybank_API = async (data, token) => {
  return await axios.post(`${GUEST_URL}/user/verifybank`, data, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}


// V2 4 ELECTRICITY BILL VERIFICATION
export const verifyelectricitybill_API = async (APIData, token) => {
  console.log(APIData)
  return await axios.post(`${GUEST_URL}/user/verifyelectricitybill`, APIData, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}

// AGREEMENT ACCEPT
export const APPROVE_AGREEMENT = async (token) => {
  return await axios.get(`${GUEST_URL}/user/approveagreement`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
}