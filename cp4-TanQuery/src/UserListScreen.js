// src/UserListScreen.js
import React, { useMemo, useState } from 'react';
import {
    View, Text, StyleSheet, FlatList, ActivityIndicator, Button, Image, SafeAreaView
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchUsers } from './api.js';

export default function UserListScreen() {
    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["users"],
        queryFn: fetchUsers,
    });

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

    // <<< ALTERAÇÃO 1: Mensagem de Carregamento >>>
    // Agora exibe um texto junto com o indicador de atividade.
    if (isLoading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="tomato" />
                <Text style={styles.infoText}>Carregando usuários...</Text>
            </View>
        );
    }

    // <<< ALTERAÇÃO 2: Mensagem de Erro >>>
    // Agora exibe uma mensagem de erro mais clara e amigável.
    if (isError) {
        return (
            <View style={styles.center}>
                <Text style={styles.errorTitle}>Erro ao carregar usuários</Text>
                <Text style={styles.errorDetail}>{String(error?.message || "Tente novamente mais tarde.")}</Text>
                <Button title="Tentar novamente" onPress={() => refetch()} />
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safe}>
            <Button
                title={isFetching ? "Atualizando..." : "Atualizar Lista"}
                onPress={() => refetch()}
            />
            <FlatList
                data={pageData}
                keyExtractor={(item) => String(item.id)}
                refreshing={isFetching}
                onRefresh={refetch}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <Text style={styles.sub}>{item.email}</Text>
                            <Text style={styles.subSmall}>
                                Cidade: {item.address.city}
                            </Text>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.empty}>Sem usuários.</Text>}
                contentContainerStyle={pageData.length === 0 && styles.center}
            />

            <View style={styles.pagination}>
                <Button title="Anterior" onPress={prevPage} disabled={page === 1} />
                <Text style={styles.pageInfo}>
                    Página {page} de {totalPages}
                </Text>
                <Button
                    title="Próxima"
                    onPress={nextPage}
                    disabled={page === totalPages}
                />
            </View>
        </SafeAreaView>
    );
}

// <<< ALTERAÇÃO 3: Adicionados novos estilos para as mensagens >>>
const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 16 },
    infoText: { // Estilo para o texto "Carregando..."
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    errorTitle: { // Estilo para o título do erro
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d9534f', // um tom de vermelho
        marginBottom: 8,
    },
    errorDetail: { // Estilo para o detalhe do erro
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    item: { flexDirection: 'row', gap: 12, padding: 16, borderBottomWidth: 1, borderBottomColor: "#ccc", alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: "#eee" },
    title: { fontWeight: "bold", marginBottom: 4 },
    sub: { color: "#333" },
    subSmall: { color: "#666", fontSize: 12, marginTop: 2 },
    empty: { fontSize: 16, color: "#666" },
    pagination: { flexDirection: 'row', gap: 12, alignItems: 'center', justifyContent: 'center', padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
    pageInfo: { fontSize: 16 },
});