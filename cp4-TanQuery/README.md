# 🎯 CP4 2025 — 2º Semestre — **TanQuery** (2TDSPZ)

![Expo](https://img.shields.io/badge/Expo-53.x-000?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74-20232a?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-ff4154?logo=reactquery&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-brightgreen)

---

## 👥 Integrantes
- **Amanda Mesquita Cirino Da Silva — RM559177**  
- **Journey Tiago Lopes Ferreira — RM556071**  
- **Paulo André Carminati — RM557881**  

**Professor:** Fernando Pinéo — **Curso:** TDS — **Turma:** 2TDSPZ  
**Repositório:** https://github.com/carmipa/mobile_aplication_development_CP_2SEM/tree/main/cp4-TanQuery

---

## 📖 Descrição
Projeto do **CP4**: consumir dados de uma **API pública** no **React Native (Expo)** usando **TanStack Query**, exibindo lista de usuários e tratando **loading** e **erro**.

---

## 🏗 Arquitetura do Projeto

> **Dica GitHub/Mermaid:** evite emojis em identificadores e sempre use **aspas** nos rótulos.  
> O bloco abaixo foi ajustado para renderizar corretamente no GitHub.

```mermaid
flowchart TD
  subgraph App["React Native (Expo)"]
    Home["HomeScreen"]
    Users["UsersScreen"]
  end

  subgraph API["JSONPlaceholder"]
    Endpoint["/users"]
  end

  Users -->|useQuery| Endpoint
```
### Fluxo
1. O app sobe com `QueryClientProvider`.  
2. `UsersScreen` executa `useQuery` → `GET /users`.  
3. Exibe **Carregando...**, trata **Erro**, e lista **nome, email e cidade**.

---

## ✨ Requisitos (PDF)
- Configurar **TanStack Query** (QueryClient/Provider).
- Usar `useQuery` para buscar a API.
- Exibir **nome**, **email** e **cidade**.
- Mensagens: **“Carregando usuários...”** e **“Erro ao carregar usuários”**.
- **API:** https://jsonplaceholder.typicode.com/users

### Pontuação (10 pts)
| Critério                                            | Pontos |
|-----------------------------------------------------|--------|
| TanStack Query corretamente instalado e configurado | 2      |
| `useQuery` utilizado corretamente                   | 2      |
| Exibição dos dados                                  | 3      |
| Loading e erro                                      | 2      |
| Organização e legibilidade                          | 1      |
| **Total**                                           | **10** |

---

## 📂 Estrutura sugerida
```
src/
 ├─ screens/
 │   └─ UsersScreen.tsx
 ├─ App.tsx
 └─ services/
     └─ api.ts
```

---

## ⚙️ Instalação
```bash
npm install
npm i @tanstack/react-query
expo start -c
```

**Atalhos Expo:** `a` Android, `i` iOS, `w` Web, `r` reload.

---

## 📜 Licença
MIT
