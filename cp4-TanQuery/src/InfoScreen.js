// src/InfoScreen.js
import React from 'react';
import {
    StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity, Linking, Image, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const groupMembers = [
    { name: 'Amanda Mesquita Cirino Da Silva', rm: 'RM559177', github: 'https://github.com/mandyy14', photo: require('../assets/fotos/amanda.png') },
    { name: 'Journey Tiago Lopes Ferreira', rm: 'RM556071', github: 'https://github.com/JouTiago', photo: require('../assets/fotos/journey.png') },
    { name: 'Paulo André Carminati', rm: 'RM557881', github: 'https://github.com/carmipa', photo: require('../assets/fotos/paulo.png') }
];
const projectRepoUrl = 'https://github.com/carmipa/mobile_aplication_development_CP_2SEM/tree/main/cp4-TanQuery';
const presentationDate = '14 de agosto de 2025';

export default function InfoScreen() {
    const styles = getThemedStyles(false);

    const handleLinkPress = (url) => {
        Linking.openURL(url).catch(err => {
            console.error("Não foi possível abrir o link", err);
            Alert.alert("Erro", "Não foi possível abrir o link.");
        });
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <View style={styles.headerSection}>
                        <Feather name="info" size={30} color={styles.headerIconColor} />
                        <Text style={styles.mainTitle}>Sobre o Projeto</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Projeto</Text>
                        <Text style={styles.projectTitle}>CP4 - Consumo de API com TanQuery</Text>
                        <Text style={styles.text}>Aplicativo que consome a API JSONPlaceholder para listar usuários, utilizando TanStack Query para gerenciar o estado do servidor.</Text>
                        <TouchableOpacity style={styles.linkButton} onPress={() => handleLinkPress(projectRepoUrl)}>
                            <Feather name="github" size={18} color={styles.linkColor} style={{ marginRight: 5 }} />
                            <Text style={styles.linkText}>Ver Repositório do Projeto</Text>
                        </TouchableOpacity>
                        <Text style={styles.presentationDate}>Data de Entrega: {presentationDate}</Text>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Equipe de Desenvolvimento</Text>
                        {groupMembers.map((member, index) => (
                            <View key={index} style={styles.memberCard}>
                                <Image source={member.photo} style={styles.memberPhoto} />
                                <View style={styles.memberDetails}>
                                    <Text style={styles.memberName}>{member.name}</Text>
                                    <Text style={styles.memberRm}>RM: {member.rm}</Text>
                                    <TouchableOpacity style={styles.linkButton} onPress={() => handleLinkPress(member.github)}>
                                        <Feather name="github" size={16} color={styles.linkColor} style={{ marginRight: 5 }} />
                                        <Text style={styles.linkText}>Perfil GitHub</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
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
        scrollViewContainer: { flexGrow: 1 },
        container: { flex: 1, padding: 25 },
        headerSection: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, justifyContent: 'center' },
        mainTitle: { fontSize: 24, fontWeight: 'bold', color: titleColor, textAlign: 'center', marginLeft: 10 },
        headerIconColor: titleColor,
        section: { marginBottom: 30, padding: 20, backgroundColor: cardBackgroundColor, borderRadius: 10, borderWidth: 1, borderColor: borderColor, elevation: 2 },
        sectionTitle: { fontSize: 20, fontWeight: 'bold', color: sectionTitleColor, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: borderColor, paddingBottom: 5 },
        projectTitle: { fontSize: 18, fontWeight: '600', color: textColor, marginBottom: 8 },
        text: { fontSize: 15, color: textColor, lineHeight: 22, marginBottom: 10 },
        presentationDate: { fontSize: 14, color: '#666', marginTop: 15, fontStyle: 'italic' },
        memberCard: { flexDirection: 'row', alignItems: 'center', marginBottom: 20, paddingBottom: 15, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: borderColor },
        memberPhoto: { width: 60, height: 60, borderRadius: 30, marginRight: 15, borderWidth: 1, borderColor: photoBorderColor },
        memberDetails: { flex: 1, justifyContent: 'center' },
        memberName: { fontSize: 17, fontWeight: 'bold', color: textColor, marginBottom: 2 },
        memberRm: { fontSize: 14, color: '#555', marginBottom: 5 },
        linkButton: { flexDirection: 'row', alignItems: 'center', marginTop: 5, alignSelf: 'flex-start' },
        linkText: { fontSize: 15, color: linkColor, fontWeight: '500' },
        linkColor: linkColor,
    });
}