import Home from './pages/Home'

import Login from './pages/Login';
import Register from './pages/Register';
import Detail from './pages/Detail.jsx';
import Store from './pages/Store';
import Profile from './pages/Profile';
import NewProduct from './components/NewProduct';
import EditProduct from './components/EditProduct';
import ResetPasswordPost from './pages/ResetPasswordPost.jsx';
import ResetPasswordPut from './pages/ResetPasswordPut.jsx';
import ProductList from './components/ProductList';
import OrdenDetail from './pages/OrdenDetail';
import Checkout from './components/Checkout';
import MercadoPagoForm from './components/MercadoPagoForm';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar.jsx'

function App() {

  return (
      <Routes>

        <Route path="/" element={<Home/>} />
        <Route path="/artwork/:id" element={<> <NavBar /><Detail /></>} />






        <Route path="/store" element={<> <NavBar /><Store reducer={"allProductsReducer"} property={"allproducts"} title={"My Cart"} /></>} />

        <Route path="/profile" element={<> <NavBar /><Profile /></>} />
        <Route path="/profile/new" element={<> <NavBar /><NewProduct /> </>} />
        <Route path="/profile/ordenDetails" element={<> <NavBar /><OrdenDetail /></>} />
        <Route path="/profile/edit-product/:id" element={<> <NavBar /><EditProduct /> </>} />
        <Route path="/profile/product-list" element={<> <NavBar /> <ProductList /> </>} />

        <Route path="/profile/:id" element={<> <NavBar /><Profile /></>} />


        <Route path="/resetpasswordPost" element={<ResetPasswordPost />} />

        <Route path="/resetpassword" element={<> <ResetPasswordPut /> </>} />
        <Route path="/checkout" element={<> <NavBar /> <Checkout /></>} />
        <Route path="/mercadoPago" element={<> <NavBar /> <MercadoPagoForm /></>} />

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
      </Routes>
  );
}

export default App;
