// src/types.ts

// Modelo de documento salvo no Firestore (sem `id`)
export type TaskDoc = {
    title: string;
    description: string;
    completed: boolean;
    dueDate: string; // ISO ex.: '2025-09-10T14:00:00Z'
    createdAt: any;  // Firebase Timestamp
    updatedAt: any;  // Firebase Timestamp
};

// Modelo que o app usa (inclui o `id` do documento)
export type Task = TaskDoc & {
    id: string;
};
