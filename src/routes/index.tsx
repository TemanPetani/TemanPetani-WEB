import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import ScrollToTop from '../components/ScrollToTop';
import LoadingFull from '../components/LoadingFull';
import { useCookies } from 'react-cookie';

// lazy loaded
const Homepage = lazy(() => import('../pages/Homepage'));
const Landing = lazy(() => import('../pages/Landing'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));
const Profile = lazy(() => import('../pages/Profile'));
const MyProduct = lazy(() => import('../pages/MyProduct'));
const DetailBeli = lazy(() => import('../pages/DetailBeli'));
const DetailJual = lazy(() => import('../pages/DetailJual'));
const CaraBayar = lazy(() => import('../pages/CaraBayar'));
const DaftarNego = lazy(() => import('../pages/DaftarNego'));
const DaftarTerjual = lazy(() => import('../pages/DaftarPenjualan'));
const DaftarTransaksi = lazy(() => import('../pages/DaftarTransaksi'));
const Tanam = lazy(() => import('../pages/Tanam'));
const LogsTanaman = lazy(() => import('../pages/LogsTanaman'));
const DetailLogTanaman = lazy(() => import('../pages/DetailLogsTanam'));
const JadwalTanam = lazy(() => import('../pages/JadwalTanam'));
const TasksJadwalTanam = lazy(() => import('../pages/TasksJadwalTanam'));
const JadwalPetani = lazy(() => import('../pages/JadwalPetani'));
const NotFound = lazy(() => import('../pages/NotFound'));

const Router = () => {
  const [cookie] = useCookies(['token']);
  const ckTkn = cookie.token;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFull />}>
        <Routes>
          <Route
            path="/"
            element={ckTkn ? <Homepage /> : <Navigate to="/landing" />}
          />
          <Route
            path="/landing"
            element={ckTkn ? <Navigate to="/" /> : <Landing />}
          />
          <Route
            path="/login"
            element={ckTkn ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={ckTkn ? <Navigate to="/" /> : <Register />}
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
            path="/jadwalpetani"
            element={<JadwalPetani />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
