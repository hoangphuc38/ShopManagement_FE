import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [customerID, setCustomerID] = useState(0);
    return (
        <AppContext.Provider value={{ customerID, setCustomerID }}>
            {children}
        </AppContext.Provider>
    );
};