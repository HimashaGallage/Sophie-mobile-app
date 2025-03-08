import React, { createContext, useContext, useState } from 'react';
import { colors } from '../styles/colors';
import { fonts } from '../styles/fonts';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
    Colors: typeof colors.light | typeof colors.dark; 
    Fonts: typeof fonts; 
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<string>('dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const Colors = theme === 'light' ? colors.light : colors.dark;
    const Fonts = fonts;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, Colors, Fonts }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};