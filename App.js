import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, Text, IconRegistry, Layout, ButtonGroup, Button } from '@ui-kitten/components';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { default as appTheme } from './custom-theme.json';
import QuestionsScreen from './QuestionsScreen'
import { HomeNavigatorScreen } from './HomeScreen'

const theme = { ...lightTheme, ...appTheme };

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Questionnaire = ({ navigation, route }) => {
  const { type } = route.params;
  return (
      <QuestionsScreen 
        type={type} 
        navigation={navigation} />
  )
}

export const HowAreYouFeelingScreen = ({ navigation }) => {
  return (
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text category="h6">Como você está se sentindo hoje?</Text>
          <Layout style={styles.buttonsContainer}>
              <ButtonGroup style={styles.buttonGroup} appearance='outline'>
                  <Button onPress={() => navigation.navigate("Home")}>Feliz</Button>
                  <Button onPress={() => navigation.navigate("Home")}>Ok</Button>
                  <Button onPress={() => navigation.navigate("Home")}>Tristinho</Button>
              </ButtonGroup>
          </Layout>
      </Layout>
  )
}


export default function App() {

  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider mapping={mapping} theme={theme}>
        <NavigationContainer>
          <Stack.Navigator headerMode='none'>
            <Stack.Screen name="Feeling" component={HowAreYouFeelingScreen}/>
            <Stack.Screen name="Home" component={HomeNavigatorScreen} />
            <Stack.Screen name="Questionnaire" component={Questionnaire} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    padding: 8,
    margin: 20,
}
});
