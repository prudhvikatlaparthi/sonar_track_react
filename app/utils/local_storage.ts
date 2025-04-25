import AsyncStorage from '@react-native-async-storage/async-storage';

class LocalStorage {


    static KEY_USER_NAME = 'user_name';
    static KEY_PASSWORD = 'password';

    // Save data to AsyncStorage
    static async setItem(key: string, value: any): Promise<void> {
        try {
            // const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, value);
            console.log(`Data saved for key: ${key}`);
        } catch (error) {
            console.error(`Error saving data for key: ${key}`, error);
            throw new Error('Failed to save data');
        }
    }

    // Retrieve data from AsyncStorage
    static async getItem(key: string): Promise<string | null> {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            // return jsonValue != null ? JSON.parse(jsonValue) : null;
            return jsonValue;
        } catch (error) {
            console.error(`Error retrieving data for key: ${key}`, error);
            throw new Error('Failed to retrieve data');
        }
    }

    // Remove data from AsyncStorage
    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
            console.log(`Data removed for key: ${key}`);
        } catch (error) {
            console.error(`Error removing data for key: ${key}`, error);
            throw new Error('Failed to remove data');
        }
    }

    // Clear all data from AsyncStorage
    static async clear(): Promise<void> {
        try {
            await AsyncStorage.clear();
            console.log('All data cleared from AsyncStorage');
        } catch (error) {
            console.error('Error clearing AsyncStorage', error);
            throw new Error('Failed to clear data');
        }
    }
}

export default LocalStorage;