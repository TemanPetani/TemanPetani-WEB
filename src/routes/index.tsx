import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import ScrollToTop from '../components/ScrollToTop';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';

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
        <Route
          path="/register"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
