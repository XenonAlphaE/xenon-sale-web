import { Routes, Route, BrowserRouter } from 'react-router-dom';
import App from './App'; // Replace with your component paths
import Staking from './pages/staking';


function AppRoutes(){
  return (<Routes>
    <Route path="/" element={<App />} />
    <Route path="/staking" element={<Staking />} />
      {/* Catch-all route for any other path */}
  </Routes>
);
}

export default AppRoutes;