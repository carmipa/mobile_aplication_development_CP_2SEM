// api.js
import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 15000,
});

// GET /users
export async function fetchUsers() {
    const { data } = await api.get("/users");
    // adiciona avatar "fake" para exibição
    return data.map((u) => ({
        ...u,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`,
    }));
}

// POST /users (mock – JSONPlaceholder não persiste)
export async function createUser(user) {
    const { data } = await api.post("/users", user);
    return {
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || data?.name || "User"
        )}&background=random`,
    };
}

// (opcional) GET /users/:id
export async function fetchUserById(id) {
    const { data } = await api.get(`/users/${id}`);
    return {
        ...data,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=random`,
    };
}
