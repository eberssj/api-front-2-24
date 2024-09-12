import { BrowserRouter as Router, Routes } from "react-router-dom"
import './App.css'
import { Sidebar } from './components/Sidebar';

export default function App() {
  return (
    <Router>
      <Sidebar />
        <Routes>
          {/*<Route path="/" element={<Projetos />} />*/}
        </Routes>
    </Router>
  );
}
