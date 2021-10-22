import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import HomeScreen from '../screens/HomeScreen';
import SpinnerScreen from '../screens/SpinnerScreen';
import RestaurantListScreen from '../screens/RestaurantListScreen';
import RestaurantItemScreen from '../screens/RestaurantItemScreen';
import LoginScreen from '../screens/LoginScreen';
import SavedRestaurantListScreen from '../screens/SavedRestaurantListScreen';
import SavedRestaurantItemScreen from '../screens/SavedRestaurantItemScreen';
import { Ionicons } from '@expo/vector-icons';
import Colours from '../constants/Colours';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const SaveStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function RootNavigator() {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Login" component={LoginScreen} />
    </RootStack.Navigator>
  );
}

//when navigating between screens in a stack the name referenced in the navigation page
//is the one the must be passed into props.navigation.navigate()
function ScreenNavigator() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'open-sans-bold',
          color: Colours.primaryColour,
        },
        headerTintColor: Colours.primaryColour,
        headerBackTitle: 'Back',
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Spinner" component={SpinnerScreen} />
      <MainStack.Screen
        name="RestaurantList"
        component={RestaurantListScreen}
        options={({ route }) => ({
          title: `${route.params.paramKey.selectedCuisine} restaurants`,
        })}
      />
      <MainStack.Screen
        name="RestaurantItem"
        component={RestaurantItemScreen}
        options={({ route }) => ({
          title: route.params.paramKey.name,
        })}
      />
    </MainStack.Navigator>
  );
}

function SavedStackNavigator() {
  return (
    <SaveStack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontSize: 24,
          fontFamily: 'open-sans-bold',
          color: Colours.primaryColour,
        },
        headerTintColor: Colours.primaryColour,
        headerBackTitle: 'Back',
      }}
    >
      <SaveStack.Screen
        name="Your Saved Restaurants"
        component={SavedRestaurantListScreen}
      />
      <SaveStack.Screen
        name="SavedRestaurantItemScreen"
        component={SavedRestaurantItemScreen}
        options={({ route }) => ({
          title: route.params.paramKey.name,
        })}
      />
    </SaveStack.Navigator>
  );
}

function MainNavigator() {
  //state accesses the root reducer object, which contains the user object
  //where authentication is checked
  const loggedInUser = useSelector((state) => state.user);
  return (
    <NavigationContainer>
      {loggedInUser.isAuthenticated == false ? (
        <RootNavigator />
      ) : (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Choose Restaurants') {
                iconName = 'ios-restaurant';
              } else if (route.name === 'Saved Restaurants') {
                iconName = 'ios-star';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },

            tabBarActiveTintColor: Colours.highLightColour,
            tabBarInactiveTintColor: Colours.primaryColour,
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: 'open-sans',
            },
          })}
        >
          <Tab.Screen
            name="Choose Restaurants"
            component={ScreenNavigator}
            options={{
              tabBarLabel: 'Choose Restaurants',
            }}
          />
          <Tab.Screen
            name="Saved Restaurants"
            component={SavedStackNavigator}
            options={{
              tabBarLabel: 'Saved Restaurants',
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default MainNavigator;
