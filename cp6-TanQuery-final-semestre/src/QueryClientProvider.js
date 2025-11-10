// QueryClientProvider.js
import React from 'react';
import { QueryClient, QueryClientProvider as TanstackProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Evita refetch agressivo ao focar o app
            refetchOnWindowFocus: false,
        },
    },
});

export default function QueryClientProvider({ children }) {
    return <TanstackProvider client={queryClient}>{children}</TanstackProvider>;
}
