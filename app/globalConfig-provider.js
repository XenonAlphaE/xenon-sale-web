"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import siteConfig from './config.site.json'

const GlobalConfigContext = createContext(null);

export const GlobalConfigProvider = ({ children }) => {
  const [config, setConfig] = useState({...siteConfig});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfigs() {
      try {
        const [mainRes, solanaRes] = await Promise.all([
          axios.get(siteConfig.ethCommonConfigUrl),
          axios.get(siteConfig.solanaCommonConfigUrl),
        ]);

        setConfig({
            ...siteConfig,
            ...mainRes.data,
            solana: {
                ...solanaRes.data,
            },
        });
      } catch (err) {
        console.error("Error loading configs:", err);
      } finally {
        setLoading(false);
      }
    }

    loadConfigs();
  }, []);

  return (
    <GlobalConfigContext.Provider value={{ config, loading }}>
      {children}
    </GlobalConfigContext.Provider>
  );
};

export const useGlobalConfig = () => 
  {
      const context = useContext(GlobalConfigContext);
      if (!context) {
        throw new Error("useGlobalConfig must be used within a GlobalConfigContext");
      }
      return context.config;
  };
