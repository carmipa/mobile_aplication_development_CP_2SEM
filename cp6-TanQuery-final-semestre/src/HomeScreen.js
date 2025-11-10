// src/HomeScreen.js
import React, { useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

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
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(20)).current;
    const footerAnim = useRef(new Animated.Value(0)).current;
    const detailAnims = useRef(projectDetails.map(() => new Animated.Value(0))).current;

    useFocusEffect(
        React.useCallback(() => {
            fadeAnim.setValue(0);
            translateAnim.setValue(20);
            footerAnim.setValue(0);
            detailAnims.forEach((anim) => anim.setValue(0));

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 450,
                    useNativeDriver: true,
                }),
            ]).start();

            Animated.stagger(
                120,
                detailAnims.map((anim) =>
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true,
                    })
                )
            ).start();

            Animated.timing(footerAnim, {
                toValue: 1,
                duration: 500,
                delay: 250,
                useNativeDriver: true,
            }).start();

            return () => {
                fadeAnim.stopAnimation();
                translateAnim.stopAnimation();
                footerAnim.stopAnimation();
                detailAnims.forEach((anim) => anim.stopAnimation());
            };
        }, [fadeAnim, translateAnim, footerAnim, detailAnims])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                <Animated.View
                    style={{
                        opacity: fadeAnim,
                        transform: [{ translateY: translateAnim }],
                    }}
                >
                    <View style={styles.header}>
                        <Animated.View
                            style={[
                                styles.iconBackground,
                                {
                                    transform: [
                                        {
                                            scale: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [0.85, 1],
                                            }),
                                        },
                                    ],
                                    opacity: fadeAnim,
                                },
                            ]}
                        >
                            <Image source={require('../assets/fotos/android.png')} style={styles.heroImage} />
                        </Animated.View>

                        {/* Título + descrição (ambos ocupam 100% da largura e centralizam o texto) */}
                        <Animated.View
                            style={[
                                styles.titleWrapper,
                                {
                                    opacity: fadeAnim,
                                    transform: [
                                        {
                                            translateY: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [20, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            <Text style={styles.mainTitle}>CP6: TanStack Query animação e efeito de tranisção de tela</Text>
                            <Text style={styles.description}>
                                Consumo de API de usuários com React Native
                            </Text>
                        </Animated.View>
                    </View>

                    <View style={styles.detailsCard}>
                        {projectDetails.map((item, index) => (
                            <Animated.View
                                key={index}
                                style={[
                                    styles.infoRow,
                                    {
                                        opacity: detailAnims[index],
                                        transform: [
                                            {
                                                translateX: detailAnims[index].interpolate({
                                                    inputRange: [0, 1],
                                                    outputRange: [-20, 0],
                                                }),
                                            },
                                        ],
                                    },
                                ]}
                            >
                                <Feather name={item.icon} size={22} color={COLORS.primary} style={styles.infoIcon} />
                                <View style={styles.infoTextContainer}>
                                    <Text style={styles.label}>{item.label}</Text>
                                    <Text style={styles.value}>{item.value}</Text>
                                </View>
                            </Animated.View>
                        ))}
                    </View>

                    <Animated.View
                        style={[
                            styles.footer,
                            {
                                opacity: footerAnim,
                                transform: [
                                    {
                                        translateY: footerAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [15, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Text style={styles.footerTitle}>Desenvolvido por</Text>
                        <Text style={styles.footerNames}>Amanda, Journey, Paulo & Gabi</Text>
                    </Animated.View>
                </Animated.View>
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
