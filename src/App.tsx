import Routes from './routes/routes';
import './App.css'
import { AuthContext } from "./hook/ContextAuth";
import { useState } from "react";
import { AdmProps } from "./Type/Adm";

export default function App() {

  const [adm, setAdm] = useState<AdmProps | null>();

  return (
    <AuthContext.Provider value={{ adm, setAdm }}>
      <Routes />
    </AuthContext.Provider>
  );
}
