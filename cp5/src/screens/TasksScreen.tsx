// src/screens/TasksScreen.tsx
import React from 'react';
import {
    View,
    Text,
    TextInput,
    Pressable,
    StyleSheet,
    FlatList,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { listTasks, createTask, removeTask, toggleComplete, updateTask } from '../services/tasks';
import { Task } from '../types';
import { ensureNotificationPermissions } from '../notifications/permissions';

export default function TasksScreen() {
    const qc = useQueryClient();
    const { data, isLoading, refetch } = useQuery({ queryKey: ['tasks'], queryFn: listTasks });

    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [dueDate, setDueDate] = React.useState(''); // ISO: 2025-09-10T14:00:00Z

    const mCreate = useMutation({
        mutationFn: async () => {
            if (!title.trim()) throw new Error('Título obrigatório');
            if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(dueDate))
                throw new Error('Data ISO inválida (use YYYY-MM-DDTHH:mm:ssZ)');
            const ok = await ensureNotificationPermissions();
            if (!ok) throw new Error('Permita notificações para agendar tarefas.');
            await createTask({
                title: title.trim(),
                description: description.trim(),
                dueDate,
            });
        },
        onSuccess: async () => {
            setTitle('');
            setDescription('');
            setDueDate('');
            await qc.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (e: any) => Alert.alert('Erro', String(e?.message ?? e)),
    });

    const mRemove = useMutation({
        mutationFn: (id: string) => removeTask(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const mToggle = useMutation({
        mutationFn: (t: Task) => toggleComplete(t),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });

    const mUpdate = useMutation({
        mutationFn: (t: Task) => updateTask(t),
        onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] }),
    });

    async function onAdd() {
        mCreate.mutate();
    }

    async function onToggleCompleted(task: Task) {
        mToggle.mutate(task);
    }

    async function onDelete(task: Task) {
        mRemove.mutate(task.id);
    }

    async function onQuickDelay(t: Task, minutes: number) {
        const base = new Date(t.dueDate);
        if (isNaN(base.getTime())) return Alert.alert('dueDate inválida');
        const next = new Date(base.getTime() + minutes * 60 * 1000);
        // normaliza para :00Z (sem ms)
        const iso = next.toISOString().replace(/\.\d{3}Z$/, ':00Z');
        mUpdate.mutate({ ...t, dueDate: iso });
    }

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>Nova tarefa</Text>
            <View style={styles.card}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Título"
                    placeholderTextColor="#9aa3c7"
                    style={styles.input}
                />
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Descrição"
                    placeholderTextColor="#9aa3c7"
                    style={styles.input}
                />
                <TextInput
                    value={dueDate}
                    onChangeText={setDueDate}
                    placeholder="Data ISO (2025-09-10T14:00:00Z)"
                    placeholderTextColor="#9aa3c7"
                    style={styles.input}
                    autoCapitalize="none"
                />
                <Pressable style={styles.primaryBtn} onPress={onAdd}>
                    <Text style={styles.primaryBtnText}>{mCreate.isPending ? 'Salvando...' : 'Salvar'}</Text>
                </Pressable>
            </View>

            <Text style={styles.title}>Minhas tarefas</Text>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    data={data ?? []}
                    keyExtractor={(item) => item.id}
                    refreshing={isLoading}
                    onRefresh={refetch}
                    renderItem={({ item }) => (
                        <View style={[styles.task, item.completed && styles.taskDone]}>
                            <Text style={styles.taskTitle}>{item.title}</Text>
                            {item.description ? <Text style={styles.taskDesc}>{item.description}</Text> : null}
                            <Text style={styles.taskDate}>Vencimento: {item.dueDate}</Text>
                            <View style={styles.row}>
                                <Pressable style={styles.btn} onPress={() => onToggleCompleted(item)}>
                                    <Text style={styles.btnText}>{item.completed ? 'Reabrir' : 'Concluir'}</Text>
                                </Pressable>
                                <Pressable style={styles.btn} onPress={() => onQuickDelay(item, 5)}>
                                    <Text style={styles.btnText}>+5m</Text>
                                </Pressable>
                                <Pressable style={styles.btn} onPress={() => onQuickDelay(item, 60)}>
                                    <Text style={styles.btnText}>+1h</Text>
                                </Pressable>
                                <Pressable style={[styles.btn, styles.danger]} onPress={() => onDelete(item)}>
                                    <Text style={styles.btnText}>Excluir</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, padding: 12 },
    title: { color: '#fff', fontSize: 16, fontWeight: '700', marginBottom: 8 },
    card: { backgroundColor: '#0f1530', padding: 12, borderRadius: 12, gap: 8 },
    input: { backgroundColor: '#12193a', color: '#fff', padding: 10, borderRadius: 8 },
    primaryBtn: { backgroundColor: '#3952e3', padding: 12, borderRadius: 8, alignItems: 'center' },
    primaryBtnText: { color: '#fff', fontWeight: '700' },
    task: { backgroundColor: '#1a1f3d', padding: 12, borderRadius: 10, marginBottom: 8 },
    taskDone: { opacity: 0.6 },
    taskTitle: { color: '#fff', fontWeight: '700' },
    taskDesc: { color: '#b7c2ee' },
    taskDate: { color: '#9aa3c7', marginBottom: 4 },
    row: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
    btn: { backgroundColor: '#3952e3', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
    btnText: { color: '#fff' },
    danger: { backgroundColor: '#6a2f42' },
});
