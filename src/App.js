import { useEffect} from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './Component/User/SignUp';
import SignIn from './Component/User/SignIn';
import ForgetPassword from './Component/User/ForgetPassword';
import Verify from './Component/User/Verify';
import Category from './Component/Category/CategoryEntryPage/Category';
import Cart from './Component/Cart/Cart';
import Chat from './Component/Chat/Chat';
import Orders from './Component/Orders/Orders';
import Profile from './Component/Profile/Profile';
import 'react-toastify/dist/ReactToastify.css';
import CategoryType from './Component/Category/CategoryType/CategoryType';
import Create from './Component/Create/CreateForm/Create';
import CreateItems from './Component/Create/CreateItems/CreateItems';
import Home from './Component/Home/Home';
import Product from './Component/Products/Product'
import store from './store';
import { loadUser } from './actions/userActions';
import ProductSearch from './Component/Products/ProductSearch';
import Address from './Component/Address/Address'
import AddAddress from './Component/Address/AddressForms/AddAddress';
import EditAddress from './Component/Address/AddressForms/EditAddress';

function App() {

  useEffect(() => {
    store.dispatch(loadUser)
  }, [])

  return (
    <Router>
      <div className="App">
        <ToastContainer theme='dark' />
        <Routes>
          <Route exact path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/forget' element={<ForgetPassword />} />
          <Route path='/verify/:id' element={<Verify />} />
          <Route path='/home' element={<Home />} />
          <Route path='/category' element={<Category />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/chat' element={<Chat />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/category/:name' element={<CategoryType />} />
          <Route path='/create' element={<Create />} />
          <Route path='/create-items' element={<CreateItems />} />
          <Route path='/product/:name' element={<Product />} />
          <Route path='/search/:keyword' element={<ProductSearch />} />
          <Route  path='/address/:name' element={<Address/>}/>
          <Route  path='/add/address' element={<AddAddress />}/>
          <Route  path='/editaddress/' element={<EditAddress />}/>

        </Routes>
      </div>
    </Router>
  );
}

export default App;
