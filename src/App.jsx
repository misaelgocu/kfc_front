
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Companies from "./pages/Companies";
import Brands from "./pages/Brands";
import Branches from "./pages/Branches";
import Sales from "./pages/Sales";
import NotFound from "./pages/NotFound";
import { MainLayout } from './components/layout/MainLayout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
         <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<Companies />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
