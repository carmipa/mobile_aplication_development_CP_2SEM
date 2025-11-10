// src/UserListItem.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';

const COLORS = {
    primary: '#005bea',
    text: '#3b3b3b',
    subtleText: '#7f7f7f',
    border: '#eee',
    card: '#fff',
};

export default function UserListItem({ user, isExpanded, onPress, index = 0 }) {
    const cardAnim = useRef(new Animated.Value(0)).current;
    const detailAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;
    const [showDetails, setShowDetails] = useState(isExpanded);

    useEffect(() => {
        Animated.timing(cardAnim, {
            toValue: 1,
            duration: 350,
            delay: index * 80,
            useNativeDriver: true,
        }).start();
    }, [cardAnim, index]);

    useEffect(() => {
        if (isExpanded) {
            setShowDetails(true);
        }
        Animated.timing(detailAnim, {
            toValue: isExpanded ? 1 : 0,
            duration: 220,
            useNativeDriver: true,
        }).start(() => {
            if (!isExpanded) {
                setShowDetails(false);
            }
        });
    }, [detailAnim, isExpanded]);

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    opacity: cardAnim,
                    transform: [
                        {
                            translateY: cardAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [16, 0],
                            }),
                        },
                    ],
                },
            ]}
        >
            <TouchableOpacity style={styles.header} onPress={onPress}>
                <Image source={{ uri: user.avatar }} style={styles.avatar} />
                <View style={styles.headerText}>
                    <Text style={styles.title}>{user.name}</Text>
                    <Text style={styles.sub}>{user.email}</Text>
                </View>
                <Feather
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={COLORS.subtleText}
                />
            </TouchableOpacity>

            {showDetails && (
                <Animated.View
                    style={[
                        styles.details,
                        {
                            opacity: detailAnim,
                            transform: [
                                {
                                    translateY: detailAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-10, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <InfoDetail icon="user" label="Username" value={user.username} detailAnim={detailAnim} />
                    <InfoDetail icon="map-pin" label="Cidade" value={user.address.city} detailAnim={detailAnim} />
                    <InfoDetail icon="home" label="Endereço" value={`${user.address.street}, ${user.address.suite}`} detailAnim={detailAnim} />
                    <InfoDetail icon="phone" label="Telefone" value={user.phone} detailAnim={detailAnim} />
                    <InfoDetail icon="globe" label="Website" value={user.website} detailAnim={detailAnim} />
                    <InfoDetail icon="briefcase" label="Empresa" value={user.company.name} detailAnim={detailAnim} />
                    <InfoDetail icon="info" label="Slogan" value={user.company.catchPhrase} detailAnim={detailAnim} />
                    <InfoDetail icon="book" label="Serviços" value={user.company.bs} detailAnim={detailAnim} />
                </Animated.View>
            )}
        </Animated.View>
    );
}

const InfoDetail = ({ icon, label, value, detailAnim }) => (
    <Animated.View
        style={[
            styles.detailRow,
            {
                opacity: detailAnim,
            },
        ]}
    >
        <Feather name={icon} size={16} color={COLORS.primary} style={styles.detailIcon} />
        <Text style={styles.detailLabel}>{label}: </Text>
        <Text style={styles.detailValue}>{value}</Text>
    </Animated.View>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.card,
        borderRadius: 12,
        marginVertical: 8,
        marginHorizontal: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    headerText: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    sub: {
        fontSize: 14,
        color: COLORS.subtleText,
    },
    details: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 6,
    },
    detailIcon: {
        marginRight: 10,
    },
    detailLabel: {
        fontWeight: 'bold',
        color: COLORS.text,
    },
    detailValue: {
        color: COLORS.subtleText,
        flex: 1,
    },
});