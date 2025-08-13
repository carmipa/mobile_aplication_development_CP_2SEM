## 🎯 CP4 2025 - 2º SEMESTRE - "TanQuery"

**Integrantes do CP:**  
   - **Paulo André Carminati RM557881 - 2TDSPZ**  


**Repositório no GitHub:** [CP1 Mobile](https://github.com/carmipa/mobile_aplication_development_CP_2SEM/tree/main/cp4-TanQuery)

# Atividade 01 - TanStack Query no React Native

**Curso:** Tecnologia em Desenvolvimento de Sistemas - 2TDS-2025  
**Professor:** Fernando Pinéo  
**Componente Curricular:** Mobile Application Development  

## Orientações

- A tarefa poderá ser realizada em trio.
- Um integrante deverá entregar o link do repositório.
- Incluir os nomes dos integrantes no arquivo `README.md`.
- Configurar o repositório como **público**.
- Peso: **1,5 pontos** no CP4.
- **Data de entrega:** 14/08/2025 às 23:59h.

## Objetivo da Atividade

Consumir dados de uma API pública no **React Native** utilizando o **TanStack Query**, exibindo os dados e lidando com estados de carregamento e erro.

## Recursos Utilizados

- React Native (com Expo)  
- TanStack Query (`@tanstack/react-query`)  
- API pública: [https://jsonplaceholder.typicode.com/users](https://jsonplaceholder.typicode.com/users)  

## Enunciado

Crie um aplicativo **React Native** simples que exiba uma lista de usuários obtidos da API: https://jsonplaceholder.typicode.com/users

O app deve:

1. Instalar e configurar o **TanStack Query** (`QueryClient` e `QueryClientProvider`).
2. Utilizar o hook `useQuery` para buscar os dados da API.
3. Exibir **nome**, **email** e **cidade** de cada usuário.
4. Exibir mensagens de:
   - **Carregamento:** `"Carregando usuários..."`
   - **Erro:** `"Erro ao carregar usuários"`

## Critérios de Avaliação

| Critério                                            | Pontos    |
| --------------------------------------------------- | --------- |
| TanStack Query corretamente instalado e configurado | 2 pt      |
| Hook `useQuery` utilizado corretamente              | 2 pt      |
| Exibição dos dados na interface                     | 3 pt      |
| Tratamento de loading e erro                        | 2 pt      |
| Organização e legibilidade do código                | 1 pt      |
| **Total**                                           | **10 pt** |

## Opcional (para alunos mais avançados)

- Adicionar botão para **refetch**.
- Adicionar **paginador** (mesmo que falso).
- Adicionar **navegação** entre telas.


--- 
