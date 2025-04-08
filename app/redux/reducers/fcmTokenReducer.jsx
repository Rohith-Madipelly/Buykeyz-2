

const token = ""

const initialState = {
  fcmToken: token || "",
  isFcmToken: token ? true : false,
};



const fcmTokenReducer = (state = initialState, action) => {

  switch (action.type) {
    case "FCM_TOKEN":

      return {
        ...state,
        fcmToken: action.fcmToken,
        isFcmToken: action.isFcmToken ? true : false,
      };
    default:
      return state;
  }
};

export default fcmTokenReducer;








