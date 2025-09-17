## 🎯 CP4 2025 - 2º SEMESTRE - "TanQuery" 2TDSPZ

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

**Professor:** Fernando Pinéo  
**Curso:** Tecnologia em Desenvolvimento de Sistemas (2TDSPZ)  
**Disciplina:** Mobile Application Development  

**Repositório no GitHub:** [CP4 Mobile](https://github.com/carmipa/mobile_aplication_development_CP_2SEM/tree/main/cp5)

---

## 📖 Descrição

Este projeto faz parte do **Checkpoint 4 (CP4)** do 2º semestre de 2025.  
O objetivo é **consumir dados de uma API pública no React Native utilizando TanStack Query**, exibindo os dados em tela e tratando estados de **carregamento** e **erro**.

---

## 📝 Objetivo da Atividade

- Instalar e configurar o **TanStack Query** (`QueryClient` e `QueryClientProvider`).  
- Utilizar o hook `useQuery` para buscar dados da API.  
- Exibir informações (nome, e-mail e cidade dos usuários).  
- Exibir mensagens de:
  - **Carregamento:** `"Carregando usuários..."`  
  - **Erro:** `"Erro ao carregar usuários"`  

**API utilizada:** [JSONPlaceholder Users](https://jsonplaceholder.typicode.com/users)

---

## 🏗 Arquitetura do Projeto

```mermaid
flowchart TD
  subgraph App[📱 React Native (Expo)]
    Home[🏠 HomeScreen]
    Users[👥 UsersScreen]
  end

  subgraph API[🌍 JSONPlaceholder]
    Endpoint[/users/]
  end

  Users -->|useQuery| Endpoint
```

### Fluxo de funcionamento
1. O app inicia e o **QueryClientProvider** envolve toda a aplicação.  
2. A tela `UsersScreen` dispara `useQuery` para buscar dados da API.  
3. Enquanto aguarda, exibe `"Carregando usuários..."`.  
4. Se houver erro, exibe `"Erro ao carregar usuários"`.  
5. Quando concluído, mostra lista com **nome, email e cidade**.  

---

## ✨ Funcionalidades

- ✔️ Listagem de usuários da API  
- ✔️ Exibição de **nome, email, cidade**  
- ✔️ Estado de carregamento (`isLoading`)  
- ✔️ Estado de erro (`isError`)  
- ✔️ Organização em componentes funcionais  
- ✔️ Código comentado e legível  

### 🔁 Funcionalidades Opcionais (Extra)
- 🔄 Botão **Refetch** (atualizar lista)  
- 📑 Paginação (mesmo que fake)  
- 🧭 Navegação entre telas  

---

## 📂 Estrutura de Pastas

```bash
src/
 ├─ screens/
 │   └─ UsersScreen.tsx      # tela que consome a API
 ├─ App.tsx                  # ponto de entrada com QueryClientProvider
 └─ services/
     └─ api.ts               # configuração base do fetch
```

---

## ⚙️ Instalação

```bash
# Clonar repositório
git clone https://github.com/carmipa/mobile_aplication_development_CP_2SEM.git
cd cp4-TanQuery

# Instalar dependências
npm install

# Instalar TanStack Query
npm i @tanstack/react-query
```

---

## ▶️ Execução

```bash
expo start -c
```

- **a** → abre no Android Emulator  
- **i** → abre no iOS Simulator  
- **w** → abre no navegador (Web)  

---

## 📊 Critérios de Avaliação (10 pts)

| Critério                                            | Pontos |
| --------------------------------------------------- | ------ |
| TanStack Query corretamente instalado e configurado | 2      |
| Hook `useQuery` utilizado corretamente              | 2      |
| Exibição dos dados na interface                     | 3      |
| Tratamento de loading e erro                        | 2      |
| Organização e legibilidade do código                | 1      |
| **Total**                                           | **10** |

---

## 📜 Licença

Este projeto está licenciado sob a **MIT License**.  
Uso livre para fins acadêmicos e de aprendizado.

---
