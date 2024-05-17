import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import ProductDetails from "./screens/ProductDetails";
import Header from "./components/Header";
import ShippingScreen from "./screens/ShippingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import UsersListScreen from "./screens/UsersListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductsListScreen from "./screens/ProductsListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import ProductCreateScreen from "./screens/ProductCreateScreen";
import OrderListScreen from "./screens/OredersListScreen";
import OrderScreen from "./screens/OrderScreen";
import MenScreen from "./screens/MenScreen";
import WomenScreen from "./screens/WomenScreen";
import CouplesScreen from "./screens/CouplesScreen";
import ChildrenScreen from "./screens/ChildrenScreen";
import ProductsScreen from "./screens/ProductsScreen";

function App() {
  return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<HomeScreen />}/>
          <Route path='/products/' element={<ProductsScreen />}/>
          <Route path='/men/' element={<MenScreen />}/>
          <Route path='/women/' element={<WomenScreen />}/>
          <Route path='/couples/' element={<CouplesScreen />}/>
          <Route path='/children/' element={<ChildrenScreen />}/>
          <Route path='/product/:id/' element={<ProductDetails />}/>
          <Route path='/cart/:id?' element={<CartScreen />}/>
          <Route path='/shipping/' element={<ShippingScreen />}/>
          <Route path='/payment/' element={<PaymentScreen />}/>
          <Route path='/placeorder/' element={<PlaceOrderScreen />}/>
          <Route path='/login/' element={<LoginScreen />}/>
          <Route path='/register/' element={<RegisterScreen />}/>
          <Route path='/profile/' element={<ProfileScreen />}/>
          <Route path='/admin/users/' element={<UsersListScreen />}/>
          <Route path='/admin/user/:id/' element={<UserEditScreen />}/>
          <Route path='/admin/products/' element={<ProductsListScreen />}/>
          <Route path='/admin/product/:id' element={<ProductEditScreen />}/>
          <Route path='/admin/product/create/' element={<ProductCreateScreen />}/>
          <Route path='/admin/orders/' element={<OrderListScreen />}/>
          <Route path='/admin/order/:id' element={<OrderScreen />}/>

        </Routes>
      </BrowserRouter>

  );
}

export default App;
