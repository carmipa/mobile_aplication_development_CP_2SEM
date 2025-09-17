## 🎯 CP5 2025 - 2º SEMESTRE 

**Integrantes do CP4:**  
   - **Paulo André Carminati RM557881 - 2TDSPZ**
   - **Amanda RM5559177 - 2TDSPZ**  
   - **Journey RM556071 - 2TDSPZ**   


o](https://img.shields.io/badge/Expo-53.0.0-000000?logo=expo&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.74-61DAFB?logo=react&logoColor=white&labelColor=20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-Auth%20%7C%20Firestore-ffca28?logo=firebase&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack%20Query-5.x-ff4154?logo=reactquery&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📖 Descrição

Este projeto é uma aplicação **React Native com Expo** desenvolvida para estudos de **autenticação com Firebase** e integração de **serviços externos via TanStack Query**.  
O app implementa:

- 🔐 **Autenticação Firebase (e-mail/senha e anônima)** com persistência via `AsyncStorage`  
- 📂 **Firestore** para salvar tarefas e produtos  
- 🔔 **Notificações locais** com agendamento por data/hora vinculadas a cada tarefa  
- 🌤️ **Consumo de API de Clima (Open-Meteo)**  
- ✍️ **Consumo de API de Frases (Quotable)**  
- 🎨 **Tema Dark/Light alternável**  
- 🌍 **Internacionalização pronta com `expo-localization`**  

---

## 🏗️ Arquitetura do Projeto

```mermaid
flowchart TD
    subgraph MobileApp[📱 App React Native (Expo)]
      Home[🏠 HomeScreen]
      Tasks[📝 TasksScreen]
      Weather[🌤️ WeatherScreen]
      Quotes[💬 QuotesScreen]
    end

    subgraph Firebase[🔥 Firebase]
      Auth[🔐 Auth]
      Firestore[(📂 Firestore DB)]
    end

    subgraph APIS[🌍 APIs Externas]
      Meteo[☀️ Open-Meteo API]
      QuotesAPI[✍️ Quotable API]
    end

    Home --> Auth
    Tasks --> Firestore
    Tasks --> Notif[🔔 Notificações Locais]
    Weather --> Meteo
    Quotes --> QuotesAPI
```

### 📌 Fluxo resumido
1. O usuário faz login com **Firebase Auth**.  
2. A tela **HomeScreen** exibe ações (trocar tema, logout, alterar senha, excluir conta, cadastrar produto).  
3. A tela **TasksScreen** permite criar tarefas que são salvas no **Firestore** e geram **notificação local agendada**.  
4. A tela **WeatherScreen** usa **TanStack Query** para consumir a **API Open-Meteo** e exibir o clima atual.  
5. A tela **QuotesScreen** usa **TanStack Query** para buscar frases inspiracionais da **API Quotable**.  

---

## 📂 Estrutura de Pastas

```bash
src/
 ├── api/                # hooks e serviços de APIs externas
 ├── components/         # componentes reutilizáveis
 ├── context/            # contextos globais (ex. Theme, Auth)
 ├── firebase/           # inicialização do Firebase (DEPRECATED)
 ├── services/           # firebaseConfig.ts, tasks.ts, taskNotifMap.ts
 ├── notifications/      # scheduler.ts (notificações locais)
 ├── screens/            # TasksScreen, WeatherScreen, QuotesScreen
 ├── storage/            # abstrações de AsyncStorage
 ├── App.tsx             # entrada principal (abas)
 ├── AppProviders.tsx    # Providers (React Query + Notifications)
 └── types.ts            # tipagens de Task, TaskDoc, etc.
```

---

## ⚙️ Instalação e Execução

### 🔽 Clone o repositório
```bash
git clone https://github.com/seu-repo/aulafirebaseauth-intl2.git
cd aulafirebaseauth-intl2
```

### 📦 Instale as dependências
```bash
npm install
```

### 🔧 Configure o Firebase
No arquivo `.env.local` (ou em `firebaseConfig.ts` diretamente), adicione suas credenciais:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

### ▶️ Rode o app
```bash
expo start -c
```

Abra no **Expo Go** (Android/iOS) ou em emulador.

---

## 🖥️ Funcionalidades em Tela

- **HomeScreen**
  - Alternar tema Dark/Light
  - Logoff
  - Alterar senha
  - Excluir conta
  - Cadastrar produto
  - Mostrar Clima (API)
  - Mostrar Frase do Dia (API)

- **TasksScreen**
  - Criar tarefa (com título, descrição e data/hora)
  - Listar tarefas
  - Concluir/reabrir tarefa
  - Excluir tarefa
  - Notificação agendada no horário da tarefa

- **WeatherScreen**
  - Exibe temperatura atual e condição climática (obtidas via GPS + Open-Meteo)

- **QuotesScreen**
  - Mostra frase motivacional aleatória (Quotable API)

---

## 📸 Screenshots

> *(adicione aqui prints reais do app rodando no emulador ou celular)*

---

## 🛠️ Tecnologias

- [Expo](https://expo.dev/)  
- [React Native](https://reactnative.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Firebase Auth](https://firebase.google.com/docs/auth)  
- [Firestore](https://firebase.google.com/docs/firestore)  
- [Expo Notifications](https://docs.expo.dev/versions/latest/sdk/notifications/)  
- [TanStack Query](https://tanstack.com/query/latest)  
- [Open-Meteo API](https://open-meteo.com/)  
- [Quotable API](https://github.com/lukePeavey/quotable)  

---

## 📜 Licença

Este projeto está sob a licença **MIT**.  
Sinta-se livre para usar e modificar.
