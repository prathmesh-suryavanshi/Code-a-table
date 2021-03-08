/*
Filename: Main Navigation
Description: Main navigation
*/
import { createStackNavigator } from '@react-navigation/stack';
import React from "react"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "../screens/dashboard/homeScreen";
import LoginScreen from "../screens/user/loginScreen"
import { ActivityIndicator } from 'react-native';
export const AuthContext = React.createContext();
const Stack = createStackNavigator()

export default function MainNavigator() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );


    const authContext = React.useMemo(
        () => ({
            signIn: async data => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `AsyncStorage`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
        }),
        []
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
          let userToken;
    
          try {
            userToken = await AsyncStorage.getItem('userToken');
          } catch (e) {
            alert(e)
          }
    
          // After restoring token, we may need to validate it in production apps
    
          // This will switch to the App screen or Auth screen and this loading
          // screen will be unmounted and thrown away.
          dispatch({ type: 'RESTORE_TOKEN', token: userToken });
        };
    
        bootstrapAsync();
      }, []);

      if (state.isLoading) {
        // We haven't finished checking for the token yet
        return <ActivityIndicator />;
      }


    return (
        <AuthContext.Provider value={authContext}>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {
                    backgroundColor: '#f4b244',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}>
                {state.userToken == null ? <Stack.Screen name="LoginScreen" component={LoginScreen} options={{
                        headerTitle: "Login",
                        headerLeft: () => (
                            null
                        ),
                    }}/> :
                    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{
                        headerTitle: "Home",
                        headerLeft: () => (
                            null
                        ),
                    }} />}
            </Stack.Navigator>
        </NavigationContainer>
        </AuthContext.Provider>
    );
}
