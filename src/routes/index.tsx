import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../pages/Homepage';
import ScrollToTop from '../components/ScrollToTop';
import Landing from '../pages/Landing';

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
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
