import './App.css';
import Header from './components/Header';
import Home from './components/Home/Home';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import About from './components/About';
import ProductDetails from './components/ProductDetails';
import Contact from './components/Contact';
import Login from './components/loginsignup/Login';
import Signup from './components/loginsignup/SignUp';
import CheckOut from './components/CheckOut';
import { useSelector } from 'react-redux';
import Profile from './components/Profile';
import CategoryPage from './components/Home_categories/CategoryPage';
import CategoriesSection from './components/Home/CategoriesSection';
import Admin from './admin/AdminDashboard';
import ProductManagement from "./admin/ProductManagement";
import OrderManagement from "./admin/OrderManagement";
import UserManagement from "./admin/UserManagement";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="App">
      <ToastContainer position="top-right" autoClose={1000} />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/admin/products' element={<ProductManagement />} />
        <Route path='/admin/orders' element={<OrderManagement />} />
        <Route path='/admin/users' element={<UserManagement />} />
        <Route path='/products' element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<CategoriesSection />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/login' element={!user ? <Login /> : <Profile />} />
        <Route path='/signup' element={!user ? <Signup /> : <Profile />} />
        <Route path='/profile' element={user ? <Profile /> : <Login />} />
        <Route path='/checkout' element={<CheckOut />} />
      </Routes>
    </div>
  );
}

export default App;
