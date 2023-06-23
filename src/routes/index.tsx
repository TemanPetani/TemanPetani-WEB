import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import ScrollToTop from '../components/ScrollToTop';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Profile from '../pages/Profile';
import MyProduct from '../pages/MyProduct';
import DetailBeli from '../pages/DetailBeli';
import DetailJual from '../pages/DetailJual';
import CaraBayar from '../pages/CaraBayar';

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
          path="/myproduct"
          element={<MyProduct />}
        />
        <Route
          path="/detail/:type/:productId"
          element={<DetailBeli />}
        />
        <Route
          path="/edit/:productId"
          element={<DetailJual />}
        />
        <Route
          path="/payment/:transactionId"
          element={<CaraBayar />}
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
