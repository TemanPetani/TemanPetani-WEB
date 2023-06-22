import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import ScrollToTop from '../components/ScrollToTop';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Homepage />}
        />
        <Route
          path="/landing"
          element={<Landing />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
