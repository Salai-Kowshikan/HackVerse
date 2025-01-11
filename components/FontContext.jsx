import React, { createContext, useState, useContext } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontSettings, setFontSettings] = useState({
    fontSize: 16,
    lineHeight: 20,
  });

  const updateFontSettings = (settings) => {
    setFontSettings((prev) => ({ ...prev, ...settings }));
  };

  const [loading,setLoading] = useState(false);
  const [language, setLanguage] = useState('ta')

  return (
    <FontContext.Provider value={{ fontSettings, updateFontSettings, loading, setLoading, language, setLanguage }}>
      {children}
    </FontContext.Provider>
  );
};

export const useFontSettings = () => useContext(FontContext);
