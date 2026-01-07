"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import siteConfig from './config.site.json'
import solConfig from './config.solana.main.json'
import ethConfig from './config.eth.main.json'

const GlobalConfigContext = createContext(null);

export const GlobalConfigProvider = ({ children }) => {
  const config = {
            ...siteConfig,
            ...ethConfig,
            solana: {
                ...solConfig,
            },
        };
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //    setConfig({
  //           ...siteConfig,
  //           ...ethConfig,
  //           solana: {
  //               ...solConfig,
  //           },
  //       });
  //   async function loadConfigs() {
  //     try {
  //       // const [mainRes, solanaRes] = await Promise.all([
  //       //   axios.get(siteConfig.ethCommonConfigUrl),
  //       //   axios.get(siteConfig.solanaCommonConfigUrl),
  //       // ]);
        
  //       setConfig({
  //           ...siteConfig,
  //           ...ethConfig,
  //           solana: {
  //               ...solConfig,
  //           },
  //       });
  //     } catch (err) {
  //       console.error("Error loading configs:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadConfigs();
  // }, []);

  return (
    <GlobalConfigContext.Provider value={{ config }}>
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
