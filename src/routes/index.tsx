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
import DaftarNego from '../pages/DaftarNego';
import DaftarTerjual from '../pages/DaftarPenjualan';
import DaftarTransaksi from '../pages/DaftarTransaksi';
import Tanam from '../pages/Tanam';
import LogsTanaman from '../pages/LogsTanaman';
import DetailLogTanaman from '../pages/DetailLogsTanam';
import JadwalTanam from '../pages/JadwalTanam';
import TasksJadwalTanam from '../pages/TasksJadwalTanam';

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
          path="/nego"
          element={<DaftarNego />}
        />
        <Route
          path="/terjual"
          element={<DaftarTerjual />}
        />
        <Route
          path="/transaksi"
          element={<DaftarTransaksi />}
        />
        <Route
          path="/tanam"
          element={<Tanam />}
        />
        <Route
          path="/tanaman_saya"
          element={<LogsTanaman />}
        />
        <Route
          path="/tanaman_saya/:logs"
          element={<DetailLogTanaman />}
        />
        <Route
          path="/jadwaltanam"
          element={<JadwalTanam />}
        />
        <Route
          path="/jadwaltanam/:schedule_id"
          element={<TasksJadwalTanam />}
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
