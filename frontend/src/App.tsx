import { Routes, Route } from "react-router-dom";
import './App.css'
import AppLayout from './components/layout/AppLayout'

function App() {

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}></Route>
      <Route path="/dashboard" element={<AppLayout />}></Route>
      <Route path="/nexus" element={<AppLayout />}></Route>
      <Route path="/intake" element={<AppLayout />}></Route>
      <Route path="/pre-active" element={<AppLayout />}></Route>
      <Route path="/active" element={<AppLayout />}></Route>
      <Route path="/blocked" element={<AppLayout />}></Route>
      <Route path="/closed" element={<AppLayout />}></Route>
      <Route path="/proforma-invoices" element={<AppLayout />}></Route>
      <Route path="/final-invoices" element={<AppLayout />}></Route>
    </Routes>
  );
}

export default App
