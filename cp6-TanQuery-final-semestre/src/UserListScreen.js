// src/UserListScreen.js
import React, { useState, useMemo, useRef } from 'react';
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView, Animated, Pressable,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

// <<< CORREÇÃO AQUI >>>
// Como os arquivos estão na mesma pasta (src), usamos './'
import { fetchUsers } from './api.js';
import UserListItem from './UserListItem.js';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function ScaleButton({ children, style, disabled, onPress }) {
    const scale = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        if (disabled) return;
        Animated.spring(scale, {
            toValue: 0.95,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    };

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={disabled}
            style={[
                style,
                {
                    transform: [{ scale }],
                    opacity: disabled ? 0.7 : 1,
                },
            ]}
        >
            {children}
        </AnimatedPressable>
    );
}

export default function UserListScreen() {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const translateAnim = useRef(new Animated.Value(20)).current;
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

    const [expandedUserId, setExpandedUserId] = useState(null);
    const [page, setPage] = useState(1);
    const pageSize = 5;
    const users = data ?? [];
    const totalPages = Math.max(1, Math.ceil(users.length / pageSize));

    const pageData = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return users.slice(start, end);
    }, [users, page]);

    const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
    const prevPage = () => setPage((p) => Math.max(1, p - 1));
    const handleToggleItem = (userId) => {
        setExpandedUserId(prevId => (prevId === userId ? null : userId));
    };

    const handleRefetch = () => {
        setPage(1);
        refetch();
    };

    useFocusEffect(
        React.useCallback(() => {
            fadeAnim.setValue(0);
            translateAnim.setValue(20);

            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]).start();

            return () => {
                fadeAnim.stopAnimation();
                translateAnim.stopAnimation();
            };
        }, [fadeAnim, translateAnim])
    );

    if (isLoading) {
        return (
            <Animated.View style={styles.center}>
                <ActivityIndicator size="large" color="#005bea" />
                <Text style={styles.infoText}>Carregando usuários...</Text>
            </Animated.View>
        );
    }

    if (isError) {
        return (
            <Animated.View style={styles.center}>
                <Text style={styles.errorTitle}>Erro ao carregar usuários</Text>
                <Text style={styles.errorDetail}>{String(error?.message || "Tente novamente mais tarde.")}</Text>
                <ScaleButton
                    onPress={handleRefetch}
                    style={[styles.button, styles.primaryButton]}
                >
                    <Text style={styles.primaryButtonText}>Tentar Novamente</Text>
                </ScaleButton>
            </Animated.View>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        opacity: fadeAnim,
                        transform: [{ translateY: translateAnim }],
                    },
                ]}
            >
                <View style={styles.headerActions}>
                    <ScaleButton
                        style={[styles.button, styles.primaryButton]}
                        onPress={handleRefetch}
                        disabled={isFetching}
                    >
                        <Feather name="refresh-cw" size={16} color="#fff" />
                        <Text style={styles.primaryButtonText}>
                            {isFetching ? "Atualizando..." : "Atualizar Lista"}
                        </Text>
                    </ScaleButton>
                </View>

                <FlatList
                    data={pageData}
                    keyExtractor={(item) => String(item.id)}
                    contentContainerStyle={{ paddingHorizontal: 15, paddingBottom: 15 }}
                    renderItem={({ item, index }) => (
                        <UserListItem
                            user={item}
                            index={index}
                            isExpanded={item.id === expandedUserId}
                            onPress={() => handleToggleItem(item.id)}
                        />
                    )}
                    ListEmptyComponent={<Text style={styles.empty}>Sem usuários.</Text>}
                />

                <View style={styles.pagination}>
                    <ScaleButton
                        style={[styles.button, styles.paginationButton, page === 1 && styles.disabledButton]}
                        onPress={prevPage}
                        disabled={page === 1}
                    >
                        <Feather name="arrow-left" size={18} color="#fff" />
                        <Text style={styles.buttonText}>Anterior</Text>
                    </ScaleButton>

                    <Text style={styles.pageInfo}>Página {page} de {totalPages}</Text>

                    <ScaleButton
                        style={[styles.button, styles.paginationButton, page === totalPages && styles.disabledButton]}
                        onPress={nextPage}
                        disabled={page === totalPages}
                    >
                        <Text style={styles.buttonText}>Próxima</Text>
                        <Feather name="arrow-right" size={18} color="#fff" />
                    </ScaleButton>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

// Estilos
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#f0f4f8' },
    animatedContainer: { flex: 1 },
    center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
    infoText: { marginTop: 10, fontSize: 16, color: '#666' },
    errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#d9534f', marginBottom: 8 },
    errorDetail: { color: '#333', marginBottom: 20, textAlign: 'center' },
    headerActions: {
        padding: 15,
        alignItems: 'center',
    },
    empty: { fontSize: 16, color: "#666", textAlign: 'center', marginTop: 50 },
    pagination: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        backgroundColor: '#fff',
    },
    pageInfo: {
        fontSize: 16,
        fontWeight: '600',
        color: '#3b3b3b',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        gap: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    primaryButton: {
        backgroundColor: '#005bea',
        elevation: 2,
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    paginationButton: {
        backgroundColor: '#267DED',
    },
    disabledButton: {
        backgroundColor: '#a0c8f5',
        opacity: 0.7,
    },
});