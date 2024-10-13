import React, { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  open: boolean;
  toggleMenu: () => void;
};

const NavigationContext = createContext<NavigationContextType>({
  open: false,
  toggleMenu: () => null,
});

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((open) => !open);

  return (
    <NavigationContext.Provider value={{ open, toggleMenu }}>{children}</NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
