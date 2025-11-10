// src/InfoScreen.js
import React, { useRef } from 'react';
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView, Linking, Image, Alert, Animated, Pressable
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const groupMembers = [
    { name: 'Amanda Mesquita Cirino Da Silva', rm: 'RM559177', github: 'https://github.com/mandyy14', photo: require('../assets/fotos/amanda.png') },
    { name: 'Journey Tiago Lopes Ferreira', rm: 'RM556071', github: 'https://github.com/JouTiago', photo: require('../assets/fotos/journey.png') },
    { name: 'Paulo André Carminati', rm: 'RM557881', github: 'https://github.com/carmipa', photo: require('../assets/fotos/paulo.png') },
    { name: 'Gabielly Campos Macedo', rm: 'RM558962', github: 'https://github.com/gabimaced0/gabimaced0', photo: require('../assets/fotos/gabi.png') }
];
const projectRepoUrl = 'https://github.com/carmipa/mobile_aplication_development_CP_2SEM/tree/main/cp6-TanQuery-final-semestre';
const presentationDate = '14 de agosto de 2025';

export default function InfoScreen() {
    const containerFade = useRef(new Animated.Value(0)).current;
    const containerTranslate = useRef(new Animated.Value(20)).current;
    const sectionAnim = useRef(new Animated.Value(0)).current;
    const styles = getThemedStyles(false);

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch(err => {
            console.error("Não foi possível abrir o link", err);
            Alert.alert("Erro", "Não foi possível abrir o link.");
        });
    };

    useFocusEffect(
        React.useCallback(() => {
            containerFade.setValue(0);
            containerTranslate.setValue(20);
            sectionAnim.setValue(0);

            Animated.parallel([
                Animated.timing(containerFade, {
                    toValue: 1,
                    duration: 450,
                    useNativeDriver: true,
                }),
                Animated.timing(containerTranslate, {
                    toValue: 0,
                    duration: 450,
                    useNativeDriver: true,
                }),
            ]).start();

            Animated.timing(sectionAnim, {
                toValue: 1,
                duration: 450,
                delay: 150,
                useNativeDriver: true,
            }).start();

            return () => {
                containerFade.stopAnimation();
                containerTranslate.stopAnimation();
                sectionAnim.stopAnimation();
            };
        }, [containerFade, containerTranslate, sectionAnim])
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                contentContainerStyle={styles.scrollViewContainer}
                showsVerticalScrollIndicator={true}
                bounces={true}
            >
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: containerFade,
                            transform: [{ translateY: containerTranslate }],
                        },
                    ]}
                >
                    <Animated.View
                        style={[
                            styles.headerSection,
                            {
                                opacity: containerFade,
                                transform: [
                                    {
                                        translateY: containerFade.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [-10, 0],
                                        }),
                                    },
                                ],
                            },
                        ]}
                    >
                        <Feather name="info" size={30} color={styles.headerIconColor} />
                        <Text style={styles.mainTitle}>Sobre o Projeto</Text>
                    </Animated.View>
                    <AnimatedCard
                        cardStyle={styles.section}
                        style={{
                            opacity: sectionAnim,
                            transform: [
                                {
                                    translateY: sectionAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Text style={styles.sectionTitle}>Repositório</Text>
                        <Text style={styles.projectTitle}>CP6 - Consumo de API com TanQuery animação e efeito de transição de página</Text>

                        <LinkButton
                            style={styles.linkButton}
                            onPress={() => handleLinkPress(projectRepoUrl)}
                        >
                            <Feather name="github" size={18} color={styles.linkColor} style={{ marginRight: 5 }} />
                            <Text style={styles.linkText}>Ver Repositório do Projeto</Text>
                        </LinkButton>
                        <Text style={styles.presentationDate}>Data de Entrega: {presentationDate}</Text>
                    </AnimatedCard>
                    <AnimatedCard
                        cardStyle={styles.section}
                        style={{
                            opacity: sectionAnim,
                            transform: [
                                {
                                    translateY: sectionAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [20, 0],
                                    }),
                                },
                            ],
                        }}
                    >
                        <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
                        {groupMembers.map((member, index) => (
                            <AnimatedMemberCard
                                key={index}
                                member={member}
                                index={index}
                                sectionAnim={sectionAnim}
                                isLast={index === groupMembers.length - 1}
                                onPress={() => handleLinkPress(member.github)}
                                styles={styles}
                            />
                        ))}
                    </AnimatedCard>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const AnimatedPressableBase = Animated.createAnimatedComponent(Pressable);

function LinkButton({ children, onPress, style }) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const opacity = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 0.92,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <AnimatedPressableBase
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                style,
                {
                    transform: [{ scale }],
                    opacity: opacity,
                },
            ]}
        >
            {children}
        </AnimatedPressableBase>
    );
}

function AnimatedCard({ children, style, cardStyle }) {
    const scale = React.useRef(new Animated.Value(1)).current;
    const opacity = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 0.98,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 0.9,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: 1,
                tension: 300,
                friction: 10,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <AnimatedPressableBase
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                cardStyle,
                style,
                {
                    transform: [{ scale }],
                    opacity: opacity,
                },
            ]}
        >
            {children}
        </AnimatedPressableBase>
    );
}

function AnimatedMemberCard({ member, index, sectionAnim, isLast, onPress, styles }) {
    const cardScale = React.useRef(new Animated.Value(1)).current;
    const cardTranslateY = React.useRef(new Animated.Value(0)).current;
    const cardOpacity = React.useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(cardScale, {
                toValue: 0.97,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(cardTranslateY, {
                toValue: -2,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacity, {
                toValue: 0.85,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(cardScale, {
                toValue: 1,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.spring(cardTranslateY, {
                toValue: 0,
                tension: 300,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(cardOpacity, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <Animated.View
            style={{
                opacity: sectionAnim,
                transform: [
                    {
                        translateX: sectionAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-20, 0],
                        }),
                    },
                ],
            }}
        >
            <AnimatedPressableBase
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                onPress={onPress}
                style={[
                    styles.memberCard,
                    isLast && styles.lastMemberCard,
                    {
                        opacity: cardOpacity,
                        transform: [
                            { scale: cardScale },
                            { translateY: cardTranslateY },
                        ],
                    },
                ]}
            >
                <Image source={member.photo} style={styles.memberPhoto} />
                <View style={styles.memberDetails}>
                    <Text style={styles.memberName}>{member.name}</Text>
                    <Text style={styles.memberRm}>RM: {member.rm}</Text>
                    <LinkButton
                        style={styles.linkButton}
                        onPress={onPress}
                    >
                        <Feather name="github" size={16} color={styles.linkColor} style={{ marginRight: 5 }} />
                        <Text style={styles.linkText}>Perfil GitHub</Text>
                    </LinkButton>
                </View>
            </AnimatedPressableBase>
        </Animated.View>
    );
}

function getThemedStyles(isDark) {
    const backgroundColor = '#f4f7fc';
    const cardBackgroundColor = '#ffffff';
    const textColor = '#444455';
    const titleColor = '#1a1a2e';
    const sectionTitleColor = '#003366';
    const linkColor = '#007bff';
    const borderColor = '#e0e0e0';
    const photoBorderColor = '#ccc';

    return StyleSheet.create({
        safeArea: { flex: 1, backgroundColor: backgroundColor },
        scrollViewContainer: { 
            flexGrow: 1,
            paddingBottom: 30,
        },
        container: { padding: 25 },
        headerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, justifyContent: 'center' },
        mainTitle: { fontSize: 24, fontWeight: 'bold', color: titleColor, textAlign: 'center', marginLeft: 10 },
        headerIconColor: titleColor,
        section: { 
            marginBottom: 30, 
            padding: 20, 
            backgroundColor: cardBackgroundColor, 
            borderRadius: 10, 
            borderWidth: 1, 
            borderColor: borderColor, 
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
        },
        sectionTitle: { fontSize: 20, fontWeight: 'bold', color: sectionTitleColor, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: borderColor, paddingBottom: 5 },
        projectTitle: { fontSize: 18, fontWeight: '600', color: textColor, marginBottom: 8 },
        text: { fontSize: 15, color: textColor, lineHeight: 22, marginBottom: 10 },
        presentationDate: { fontSize: 14, color: '#666', marginTop: 15, fontStyle: 'italic' },
        memberCard: { 
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 20, 
            paddingBottom: 15, 
            paddingTop: 10,
            paddingHorizontal: 5,
            borderRadius: 8,
            borderBottomWidth: StyleSheet.hairlineWidth, 
            borderBottomColor: borderColor,
        },
        lastMemberCard: { marginBottom: 0, borderBottomWidth: 0 },
        memberPhoto: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 1, borderColor: photoBorderColor },
        memberDetails: { flex: 1, justifyContent: 'center' },
        memberName: { fontSize: 17, fontWeight: 'bold', color: textColor, marginBottom: 2 },
        memberRm: { fontSize: 14, color: '#555', marginBottom: 5 },
        linkButton: { flexDirection: 'row', alignItems: 'center', marginTop: 5, alignSelf: 'flex-start' },
        linkText: { fontSize: 15, color: linkColor, fontWeight: '500' },
        linkColor: linkColor,
    });
}