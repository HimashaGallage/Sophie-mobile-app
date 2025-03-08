import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import BottomTab from "./BottomTab";
import SignupScreen from "../screens/Auth/SignupScreen";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect, useState } from "react";
import SplashScreen from "../screens/Home/SplashScreen";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

const Stack = createNativeStackNavigator();

function AuthStack() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate loading time

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Splash" options={{ headerShown: false }}>
              {props => <SplashScreen {...props} setIsLoading={setIsLoading} />}
            </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={BottomTab} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name="Login" options={{ headerShown: false }}>
              {props => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AuthStack;