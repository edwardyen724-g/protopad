import React, { createContext, useContext } from 'react';

const UserContext = createContext(null);

export const useUser = () => {
    return useContext(UserContext);
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};
