import React, { createContext, useState, ReactNode, useContext } from "react";

type Usuario = {
  nombre: string;
  email: string;
  idioma: 'Español';
  avatar?: string;
  autoGuardado?: '30s' | '2min' | '5min' | 'manual'
}

type UsuarioContextType = {
  usuario: Usuario;
  setUsuario: React.Dispatch<React.SetStateAction<Usuario>>;
}

const UsuarioContext = createContext<UsuarioContextType | undefined>(undefined);

export const UsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario>({
    nombre: 'Usuario',
    email: 'usuario@aether.com',
    idioma: 'Español',
    avatar: '',
    autoGuardado: '2min'
  });

  return (
    <UsuarioContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};


export const useUsuario = () => {
  const context = useContext(UsuarioContext);
  if (!context) throw new Error("useUsuario debe usarse dentro de UsuarioProvider");
  return context;
};
