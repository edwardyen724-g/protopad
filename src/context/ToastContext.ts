import React, { createContext, useContext } from 'react';

const ToastContext = createContext({});

export const useToast = () => {
    return useContext(ToastContext);
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ToastContext.Provider value={{}}>{children}</ToastContext.Provider>;
};
