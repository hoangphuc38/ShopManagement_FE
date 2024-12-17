import React, { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [customerID, setCustomerID] = useState(() => {
        return localStorage.getItem("customerID") ? parseInt(localStorage.getItem("customerID")) : null;
    });

    const [customerName, setCustomerName] = useState(() => {
        return localStorage.getItem("customerName") ? localStorage.getItem("customerName") : null;
    });

    useEffect(() => {
        if (customerID !== null) {
            localStorage.setItem("customerID", customerID);
        }
        if (customerName !== null) {
            localStorage.setItem("customerName", customerName);
        }
    }, [customerID, customerName]);

    return (
        <AppContext.Provider value={{ customerID, setCustomerID, customerName, setCustomerName }}>
            {children}
        </AppContext.Provider>
    );
};