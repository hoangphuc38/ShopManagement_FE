import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [customerID, setCustomerID] = useState(0);
    const [customerName, setCustomerName] = useState("");
    return (
        <AppContext.Provider value={{ customerID, setCustomerID, customerName, setCustomerName }}>
            {children}
        </AppContext.Provider>
    );
};