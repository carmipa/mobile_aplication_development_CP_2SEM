// src/services/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
    getAuth,
    Auth,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

// 🔐 SUAS CREDENCIAIS (ok manter hardcoded em dev)
// Recomendo migrar para EXPO_PUBLIC_* depois.
const firebaseConfig = {
    apiKey: 'AIzaSyCXRoCdwRfHFTc8_zFMMJwtFewz9c8s0-A',
    authDomain: 'aulafirebase-197e9.firebaseapp.com',
    projectId: 'aulafirebase-197e9',
    storageBucket: 'aulafirebase-197e9.firebasestorage.app',
    messagingSenderId: '444409190397',
    appId: '1:444409190397:web:1f0b0b846c1f2600b5eb94',
};

// Inicializa o app
export const app = initializeApp(firebaseConfig);

// ✅ Auth com persistência AsyncStorage (React Native)
// Protegido contra reinicialização (Fast Refresh/HMR):
let _auth: Auth;
try {
    // Tente inicializar com RN persistence
    _auth = initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
} catch {
    // Se já houver uma instância (erro ao inicializar 2x), apenas recupere
    _auth = getAuth(app);
}
export const auth = _auth;

// Firestore
export const db = getFirestore(app);
