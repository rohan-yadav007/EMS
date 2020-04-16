import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    console.log('Done');
  } catch (e) {
    console.log(e);
  }
};

export const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export const removeItem = async key => {
  try {
    await AsyncStorage.removeItem(key);
    console.log('Item removed.');
  } catch (e) {
    // remove error
    console.log(e);
  }
};

export const RemoveAll = async () => {
  try {
    await AsyncStorage.clear();
    console.log('Done.');
  } catch (e) {
    // clear error
    console.log(e);
  }
};
