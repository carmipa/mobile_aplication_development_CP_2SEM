// App.js
import * as React from 'react';
import { useState } from 'react';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';

import QueryClientProvider from './src/QueryClientProvider.js';
// Importando os três componentes de tela
import HomeScreen from './src/HomeScreen.js';
import UserListScreen from './src/UserListScreen.js';
import InfoScreen from './src/InfoScreen.js';
import PageLoader from './src/PageLoader.js';

const Tab = createBottomTabNavigator();

export default function App() {
    const navigationRef = useNavigationContainerRef();
    const [isNavigating, setIsNavigating] = useState(false);
    const [routeName, setRouteName] = useState('Home');

    return (
        <QueryClientProvider>
            <SafeAreaProvider>
                <NavigationContainer
                    ref={navigationRef}
                    onReady={() => {
                        setRouteName(navigationRef.getCurrentRoute()?.name || 'Home');
                    }}
                    onStateChange={() => {
                        const currentRoute = navigationRef.getCurrentRoute()?.name;
                        if (currentRoute && currentRoute !== routeName) {
                            setIsNavigating(true);
                            setRouteName(currentRoute);
                            // Esconde o loader após um pequeno delay
                            setTimeout(() => {
                                setIsNavigating(false);
                            }, 400);
                        }
                    }}
                >
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
                    <PageLoader visible={isNavigating} />
                </NavigationContainer>
            </SafeAreaProvider>
        </QueryClientProvider>
    );
}