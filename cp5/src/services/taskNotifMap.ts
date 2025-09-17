// src/services/taskNotifMap.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'task_notif_map_v1';

/**
 * Lê o mapa salvo no AsyncStorage.
 */
export async function getMap(): Promise<Record<string, string>> {
    try {
        const raw = await AsyncStorage.getItem(KEY);
        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
}

/**
 * Persiste o mapa atualizado.
 */
export async function setMap(map: Record<string, string>) {
    await AsyncStorage.setItem(KEY, JSON.stringify(map));
}

/**
 * Associa ou remove o id de notificação de uma task.
 */
export async function setNotif(taskId: string, notifId: string | undefined) {
    const map = await getMap();
    if (notifId) {
        map[taskId] = notifId;
    } else {
        delete map[taskId];
    }
    await setMap(map);
}

/**
 * Recupera o id de notificação de uma task (se houver).
 */
export async function getNotif(taskId: string): Promise<string | undefined> {
    const map = await getMap();
    return map[taskId];
}
