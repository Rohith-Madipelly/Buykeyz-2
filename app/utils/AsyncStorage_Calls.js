import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorage_Calls {
  async setAsyncValue(key, value, callBack) {
    try {
      await AsyncStorage.setItem('Buykeyz$:' + key, JSON.stringify(value));
      console.log("setAsyncValue to ", `'Buykeyz$:' + ${key}`);
      callBack(null, true);
    } catch (error) {
      console.error("Error setting async value:", error);
      callBack('Error setting token', false);
    }
  }

  async getAsyncValue(key, callBack) {
    try {
      const result = await AsyncStorage.getItem('Buykeyz$:' + key);
      let dataSender = result ? JSON.parse(result) : null;

      if (dataSender != null && typeof dataSender === 'string') {
        dataSender = dataSender.replaceAll('"', '');
      }

      callBack(null, dataSender);
    } catch (error) {
      console.error("Error getting async value:", error);
      callBack('Error getting token', null);
    }
  }

  async removeAsyncValue(key, callBack) {
    try {
      await AsyncStorage.removeItem('Buykeyz$:' + key);
      callBack('', true);
    } catch (error) {
      console.error("Error removing async value c", error);
      callBack(' >>> ... Error removing token', false);
    }
  }
}

export default new AsyncStorage_Calls();


// AsyncStorage_Calls.setAsyncValue("Token", JSON.stringify(res.data.token), function (res, status) {
//                       if (status) {
//                           toast.show(message)
//                           dispatch(setToken(token));
//                       }
//                   })