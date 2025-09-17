// app/HomeScreen.tsx
import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
    ActivityIndicator,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import { router } from 'expo-router';
import { auth, db } from '../src/services/firebaseConfig'; // ajustado ao seu projeto
import { signOut, deleteUser } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function HomeScreen() {
    const [loading, setLoading] = React.useState(false);
    const [isDark, setIsDark] = React.useState(true); // alterna visual localmente
    const [productName, setProductName] = React.useState('');

    const user = auth.currentUser;

    async function handleLogout() {
        try {
            setLoading(true);
            await signOut(auth);
        } catch (e: any) {
            Alert.alert('Erro ao sair', String(e?.message ?? e));
        } finally {
            setLoading(false);
        }
    }

    function goChangePassword() {
        router.push('/AlterarSenhaScreen');
    }

    async function handleDeleteAccount() {
        if (!user) return;
        Alert.alert(
            'Excluir conta',
            'Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setLoading(true);
                            await deleteUser(user);
                        } catch (e: any) {
                            Alert.alert('Erro ao excluir', String(e?.message ?? e));
                        } finally {
                            setLoading(false);
                        }
                    },
                },
            ]
        );
    }

    async function handleSaveProduct() {
        const name = productName.trim();
        if (!name) return;
        try {
            setLoading(true);
            await addDoc(collection(db, 'products'), {
                name,
                createdAt: serverTimestamp(),
                uid: auth.currentUser?.uid ?? null,
            } as any);
            setProductName('');
            Alert.alert('Sucesso', 'Produto salvo!');
        } catch (e: any) {
            Alert.alert('Erro ao salvar produto', String(e?.message ?? e));
        } finally {
            setLoading(false);
        }
    }

    return (
        <SafeAreaView style={[styles.safe, isDark ? styles.safeDark : styles.safeLight]}>
            <ScrollView
                contentContainerStyle={styles.scroll}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={[styles.headerCard, isDark ? styles.cardDark : styles.cardLight]}>
                    <Text style={[styles.hello, isDark ? styles.textMutedDark : styles.textMutedLight]}>
                        Seja bem-vindo{user?.displayName ? `, ${user.displayName}` : ''}!!!
                    </Text>
                    <Text style={[styles.user, isDark ? styles.textDark : styles.textLight]}>
                        {user?.email ?? 'Usuário autenticado'}
                    </Text>
                    <Text style={[styles.subtitle, isDark ? styles.textMutedDark : styles.textMutedLight]}>
                        Você está logado ✅
                    </Text>
                </View>

                {/* Ações */}
                <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
                    <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
                        Ações
                    </Text>

                    <PrimaryButton
                        label="Alternar tema"
                        onPress={() => setIsDark((v) => !v)}
                        variant="primary"
                    />

                    <PrimaryButton
                        label="Realizar logoff"
                        onPress={handleLogout}
                        variant="info"
                    />

                    <PrimaryButton
                        label="Alterar senha"
                        onPress={goChangePassword}
                        variant="warning"
                    />

                    <PrimaryButton
                        label="Excluir conta"
                        onPress={handleDeleteAccount}
                        variant="danger"
                    />

                    {loading && (
                        <View style={styles.loaderWrap}>
                            <ActivityIndicator />
                            <Text style={[styles.loaderText, isDark ? styles.textMutedDark : styles.textMutedLight]}>
                                Processando…
                            </Text>
                        </View>
                    )}
                </View>

                {/* Exemplo de formulário (produto) */}
                <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
                    <Text style={[styles.sectionTitle, isDark ? styles.textDark : styles.textLight]}>
                        Cadastrar produto
                    </Text>
                    <Text style={[styles.label, isDark ? styles.textMutedDark : styles.textMutedLight]}>
                        Nome do produto
                    </Text>
                    <TextInput
                        value={productName}
                        onChangeText={setProductName}
                        placeholder="Digite o nome do produto"
                        placeholderTextColor={isDark ? '#8d95b5' : '#667090'}
                        style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
                    />
                    <PrimaryButton label="Salvar produto" onPress={handleSaveProduct} variant="primary" />
                </View>

                <View style={{ height: 24 }} />
            </ScrollView>
        </SafeAreaView>
    );
}

function PrimaryButton({
                           label,
                           onPress,
                           variant = 'primary',
                       }: {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'info' | 'warning' | 'danger';
}) {
    return (
        <Pressable
            onPress={onPress}
            android_ripple={{ color: 'rgba(255,255,255,0.15)', borderless: false }}
            style={({ pressed }) => [
                styles.btn,
                styles[`btn_${variant}` as const],
                pressed && styles.btnPressed,
            ]}
        >
            <Text style={styles.btnText}>{label.toUpperCase()}</Text>
        </Pressable>
    );
}

const COLORS = {
    bgDark: '#0b1020',
    bgLight: '#f5f7ff',
    cardDark: '#0f1530',
    cardLight: '#ffffff',
    borderDark: '#222a50',
    borderLight: '#e3e6f2',
    textDark: '#e7ebff',
    textLight: '#101426',
    textMutedDark: '#9aa3c7',
    textMutedLight: '#6b7391',
    accent: '#3b5bfd',
    info: '#2d9cdb',
    warn: '#f2994a',
    danger: '#eb5757',
    inputDark: '#12193a',
    inputLight: '#f1f3fb',
    shadow: '#00000040',
};

const styles = StyleSheet.create({
    safe: { flex: 1 },
    safeDark: { backgroundColor: COLORS.bgDark },
    safeLight: { backgroundColor: COLORS.bgLight },

    scroll: { padding: 16 },

    headerCard: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 12,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 14,
        elevation: 8,
    },

    card: {
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        marginBottom: 12,
    },
    cardDark: { backgroundColor: COLORS.cardDark, borderColor: COLORS.borderDark },
    cardLight: { backgroundColor: COLORS.cardLight, borderColor: COLORS.borderLight },

    hello: { fontSize: 14, marginBottom: 2 },
    user: { fontSize: 20, fontWeight: '800' },
    subtitle: { marginTop: 6 },

    sectionTitle: { fontWeight: '800', marginBottom: 10, letterSpacing: 0.2 },

    btn: {
        height: 48,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        borderWidth: 1,
        shadowColor: COLORS.shadow,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.18,
        shadowRadius: 10,
        elevation: 6,
    },
    btnPressed: { opacity: 0.85 },
    btn_primary: { backgroundColor: COLORS.accent, borderColor: '#2e45c9' },
    btn_info: { backgroundColor: COLORS.info, borderColor: '#1f78a8' },
    btn_warning: { backgroundColor: COLORS.warn, borderColor: '#bd712f' },
    btn_danger: { backgroundColor: COLORS.danger, borderColor: '#b43f3f' },
    btnText: { color: '#fff', fontWeight: '800', letterSpacing: 0.5 },

    loaderWrap: { marginTop: 6, flexDirection: 'row', alignItems: 'center', gap: 8 },
    loaderText: { fontSize: 12 },

    label: { marginBottom: 6, marginTop: 6 },
    input: { borderRadius: 12, borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 },
    inputDark: { backgroundColor: COLORS.inputDark, color: COLORS.textDark, borderColor: COLORS.borderDark },
    inputLight: { backgroundColor: COLORS.inputLight, color: COLORS.textLight, borderColor: COLORS.borderLight },

    textDark: { color: COLORS.textDark },
    textLight: { color: COLORS.textLight },
    textMutedDark: { color: COLORS.textMutedDark },
    textMutedLight: { color: COLORS.textMutedLight },
});
