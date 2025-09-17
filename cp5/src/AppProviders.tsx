import React from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {NotificationBehavior} from "expo-notifications";


// Exibe alertas no app quando a notificação dispara
// Handler de exibição das notificações (ajustado ao tipo do SDK 53)
Notifications.setNotificationHandler({
    handleNotification: async (): Promise<NotificationBehavior> => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        // novos campos exigidos pelos tipos do SDK 53:
        shouldShowBanner: true, // iOS/macOS: mostrar banner
        shouldShowList: true,   // iOS: aparecer no Notification Center
    }),
});


const queryClient = new QueryClient();


export default function AppProviders({ children }: { children: React.ReactNode }) {
    React.useEffect(() => {
        (async () => {
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.HIGH,
                    vibrationPattern: [0, 250, 250, 250],
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                    lightColor: '#FF231F7C',
                    sound: 'default',
                });
            }
        })();
    }, []);


    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}