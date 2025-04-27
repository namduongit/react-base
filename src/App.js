import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import Footer from './components/Footer/Footer';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Main from './pages/Main/Main';
import CartPage from './pages/Cart/Cart';
import HistoryPage from './pages/History/History';
import OrderPage from './pages/Order/Order';

import ShipPage from './staff/Ship/Ship';
import StayPage from './staff/Stay/Stay';
import SitPage from './staff/Sit/Sit';

import FoodPage from './admin/Food/Food';
import AccountPage from './admin/Account/Account';
import StaffPage from './admin/Staff/Staff';
import BillPage from './admin/Bill/Bill';

import Detail from './pages/Detail/Detail';

function App() {
  return (


      <BrowserRouter>

        <Header />

          <Routes>
            
            
            <Route path='/' element={<Main />}></Route>
            <Route path='/user/cart' element={<CartPage />}></Route>
            <Route path='/user/history' element={<HistoryPage />}></Route>
            <Route path='/user/order' element={<OrderPage />}></Route>

            <Route path='/staff/ship' element={<ShipPage />}></Route>
            <Route path='/staff/stay' element={<StayPage />}></Route>
            <Route path='/staff/sit' element={<SitPage />}></Route>

            <Route path='/admin/food' element={<FoodPage />}></Route>
            <Route path='/admin/account' element={<AccountPage />}></Route>
            <Route path='/admin/staff' element={<StaffPage />}></Route>
            <Route path='/admin/bill' element={<BillPage />}></Route>

            {/* Router để hiển thị sản phẩm */}
            {/* Đầu tiên hiển thị chưa có nội dung là để /detail/
                Tiếp đến sửa đổi để theo id
            */}
            <Route path='/detail/:id' element={<Detail />}></Route>


          </Routes>

        <Footer />
      
      </BrowserRouter>
      


  );
}

export default App;
