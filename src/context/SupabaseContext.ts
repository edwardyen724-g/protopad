import React, { createContext, useContext } from 'react';

const SupabaseContext = createContext(null);

export const SupabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <SupabaseContext.Provider value={null}>{children}</SupabaseContext.Provider>;
};

export const useSupabase = () => {
    return useContext(SupabaseContext);
};
