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
  const [cookie] = useCookies(['token', 'role']);
  const ckToken = cookie.token;
  const ckRole = cookie.role;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<LoadingFull />}>
        <Routes>
          <Route
            path="/landing"
            element={ckToken ? <Navigate to="/" /> : <Landing />}
          />
          <Route
            path="/login"
            element={ckToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={ckToken ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/"
            element={ckToken ? <Homepage /> : <Navigate to="/landing" />}
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
            path="/negotiation"
            element={<DaftarNego />}
          />
          <Route
            path="/solds"
            element={<DaftarTerjual />}
          />
          <Route
            path="/transaction"
            element={<DaftarTransaksi />}
          />
          {ckRole === 'admin' ? (
            <>
              <Route
                path="/plant_templates"
                element={<JadwalTanam />}
              />
              <Route
                path="/plant_templates/:templateId"
                element={<TasksJadwalTanam />}
              />
              <Route
                path="/schedules"
                element={<JadwalPetani />}
              />
            </>
          ) : (
            <>
              <Route
                path="/profile"
                element={<Profile />}
              />
              <Route
                path="/plant"
                element={<Tanam />}
              />
              <Route
                path="/myplant"
                element={<LogsTanaman />}
              />
              <Route
                path="/myplant/:logs"
                element={<DetailLogTanaman />}
              />
            </>
          )}

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
