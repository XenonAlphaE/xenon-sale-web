import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App'; // Replace with your component paths
import Staking from './pages/staking';
import { AffForm } from './components/aff-form/affForm';
import AffPage from './pages/affPage';


function AppRoutes(){
  return (<Routes>
    <Route path="/" element={<App />} />
    {/* <Route path="/staking" element={<Staking />} /> */}
    <Route path="/community" element={<AffPage />} />
      {/* Catch-all route for any other path */}
  </Routes>
);
}

export default AppRoutes;