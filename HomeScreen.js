import React from 'react';
import { StyleSheet, Platform, StatusBar } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {
  Card,
  CardHeader,
  Layout,
  Text,
  TopNavigation,
  Button,
  ButtonGroup
} from '@ui-kitten/components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const Header = (title) => (
  <CardHeader title={title}/>
);

export const HomeScreen = ({ navigation }) => (
    <SafeAreaView style={styles.safeContainer}>
        <TopNavigation title="Ávida" alignment='center'/>
        <Layout style={{ flex: 1 }}>
            <Card 
                style={styles.card} 
                header={() => Header('Depressão')} 
                status='success'
                onPress={() => navigation.push('Questionnaire', { type: "depressao" })}>
            <Text>
                Este questionário pode te ajudar a identificar suspeita de depressão. 
                Toque aqui para respondê-lo.
            </Text>
            </Card>
            <Card 
                style={styles.card} 
                header={() => Header('Diabetes')} 
                status='success'
                onPress={() => navigation.push('Questionnaire', { type: "diabetes" })}>
                <Text>
                    Preencha esse formulário para saber se você tem diabetes.
                </Text>
            </Card>
        </Layout>
    </SafeAreaView>
);

function SettingsScreen() {
    return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
    </Layout>
    );
}

export const HomeNavigatorScreen= () => (
    <Tab.Navigator headerMode='none'>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Perfil" component={SettingsScreen} />
    </Tab.Navigator>
)

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    card: {
        marginVertical: 8,
    },
    buttonGroup: {
        margin: 8,
    }
});