// src/HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const projectDetails = [
    { icon: 'book-open', label: 'CURSO',      value: 'Tecnologia em Desenvolvimento de Sistemas' },
    { icon: 'users', label: 'TURMA',      value: '2-TDSPZ - 2º Semestre - FIAP-2025' },
    { icon: 'user',      label: 'PROFESSOR',  value: 'Fernando Pinéo de Abreu' },
    { icon: 'package',   label: 'MATÉRIA', value: 'Mobile Application Development' },
];

const COLORS = {
    primary: '#005bea',
    secondary: '#3b3b3b',
    lightText: '#7f7f7f',
    background: '#f0f4f8',
    card: '#ffffff',
    iconBg: '#e6f0ff',
};

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <View style={styles.iconBackground}>
                        <Image source={require('../assets/fotos/android.png')} style={styles.heroImage} />
                    </View>

                    {/* Título + descrição (ambos ocupam 100% da largura e centralizam o texto) */}
                    <View style={styles.titleWrapper}>
                        <Text style={styles.mainTitle}>CP4: TanStack Query</Text>
                        <Text style={styles.description}>
                            Consumo de API de usuários com React Native
                        </Text>
                    </View>
                </View>

                <View style={styles.detailsCard}>
                    {projectDetails.map((item, index) => (
                        <View key={index} style={styles.infoRow}>
                            <Feather name={item.icon} size={22} color={COLORS.primary} style={styles.infoIcon} />
                            <View style={styles.infoTextContainer}>
                                <Text style={styles.label}>{item.label}</Text>
                                <Text style={styles.value}>{item.value}</Text>
                            </View>
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerTitle}>Desenvolvido por</Text>
                    <Text style={styles.footerNames}>Amanda, Journey & Paulo</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flexGrow: 1,
        padding: 25,
    },

    // Importante: não use alignItems: 'center' aqui, para não encolher a largura dos filhos
    header: {
        alignItems: 'stretch',
        marginBottom: 30,
    },

    iconBackground: {
        alignSelf: 'center',
        backgroundColor: COLORS.iconBg,
        borderRadius: 20,
        padding: 15,
        marginBottom: 16,
    },
    heroImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },

    // Wrapper do título/descrição ocupa 100% da largura
    titleWrapper: {
        alignSelf: 'stretch',
        width: '100%',
        paddingHorizontal: 8,
    },

    // Título ocupa 100% da largura e centraliza texto
    mainTitle: {
        width: '100%',
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.secondary,
        marginTop: 4,
        marginBottom: 8,
    },

    // Descrição idem
    description: {
        width: '100%',
        alignSelf: 'stretch',
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.lightText,
        lineHeight: 24,
        marginBottom: 4,
    },

    detailsCard: {
        backgroundColor: COLORS.card,
        borderRadius: 15,
        padding: 20,
        width: '100%',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoIcon: { marginRight: 15, marginTop: 3 },
    infoTextContainer: { flex: 1 },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginBottom: 6,
    },
    value: {
        fontSize: 16,
        color: COLORS.secondary,
        lineHeight: 22,
    },
    footer: { marginTop: 40, alignItems: 'center' },
    footerTitle: { fontSize: 14, color: COLORS.lightText },
    footerNames: { fontSize: 16, color: COLORS.secondary, fontWeight: '600', marginTop: 4 },
});
