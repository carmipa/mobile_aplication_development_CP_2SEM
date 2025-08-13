// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import QueryClientProvider from './src/QueryClientProvider.js';
// Importando os três componentes de tela
import HomeScreen from './src/HomeScreen.js';
import UserListScreen from './src/UserListScreen.js';
import InfoScreen from './src/InfoScreen.js';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <QueryClientProvider>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="Home"
                        screenOptions={({ route }) => ({
                            headerTitleAlign: 'center',
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Home') {
                                    iconName = focused ? 'home' : 'home-outline';
                                } else if (route.name === 'Usuários') {
                                    iconName = focused ? 'people' : 'people-outline';
                                } else if (route.name === 'Sobre') {
                                    iconName = focused ? 'information-circle' : 'information-circle-outline';
                                }

                                return <Ionicons name={iconName} size={size} color={color} />;
                            },
                            tabBarActiveTintColor: 'tomato',
                            tabBarInactiveTintColor: 'gray',
                        })}
                    >
                        {/* AQUI ESTÁ A CONFIGURAÇÃO CORRETA */}
                        <Tab.Screen
                            name="Home"
                            component={HomeScreen}
                            options={{ title: 'Início' }}
                        />
                        <Tab.Screen
                            name="Usuários"
                            component={UserListScreen} // Aba "Usuários" mostra a LISTA
                            options={{ title: 'Usuários' }}
                        />
                        <Tab.Screen
                            name="Sobre"
                            component={InfoScreen} // Aba "Sobre" mostra as INFORMAÇÕES DA EQUIPE
                            options={{ title: 'Sobre' }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}