import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import CreateProduct from "./pages/CreateProduct";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SellerProfile from "./pages/SellerProfile";

import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./layouts/ProtectedLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/home"
            element={<Home />}
          />

          <Route
            path="/create-product"
            element={<CreateProduct />}
          />

          <Route
            path="/product/:id"
            element={<ProductDetails />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/seller/:id"
            element={<SellerProfile />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;