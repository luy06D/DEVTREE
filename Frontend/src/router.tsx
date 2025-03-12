import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginViews from './views/LoginViews';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginViews />} />
      </Routes>
    </BrowserRouter>
  );
}
