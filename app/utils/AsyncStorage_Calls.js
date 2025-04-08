import AsyncStorage from '@react-native-async-storage/async-storage';

class AsyncStorage_Calls {
  async setAsyncValue(key, value, callBack) {
    try {
      await AsyncStorage.setItem('Buykeyz$:' + key, JSON.stringify(value));
      console.log("setAsyncValue");
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
      callBack(null, true);
    } catch (error) {
      console.error("Error removing async value:", error);
      callBack('Error removing token', false);
    }
  }

  // Optional alias for setting token
  async setTokenJWT(token, callBack) {
    this.setAsyncValue("Token", token, callBack);
  }

  async getTokenJWT(callBack) {
    this.getAsyncValue("Token", callBack);
  }

  async removeTokenJWT(callBack) {
    this.removeAsyncValue("Token", callBack);
  }
}

export default new AsyncStorage_Calls();
