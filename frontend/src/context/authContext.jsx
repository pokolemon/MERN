import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                
                    const token = localStorage.getItem("token");
                    if (token) {
                        const response = await axios.get(
                            'http://localhost:5000/api/auth/verify',
                            {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            }
                        );
                        console.log(response);

                        if (response.data.success) {
                            setUser(response.data.user);
                        }
                    } else {
                        setUser(null);
                        setLoading(false)
                    }
                
            } catch (error) {
                console.log(error);
                if (error.response && !error.response.data.error) {
                    setUser(null);
                }
            } finally {
                setLoading(false);
            }
        };
        verifyUser();
    }, []);

    const login = (user) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    };

    return (
        <UserContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </UserContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useAuth must be used within a UserContextProvider');
    }
    return context;
};

export default AuthProvider;

