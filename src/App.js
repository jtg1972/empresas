import logo from './logo.svg';
import './App.scss';
import Navbar from './components/Navbar';
import MainLayoutBusiness from './Layouts/MainLayoutBusiness';
import Home from './pages/Business';
import Products from './pages/Products'
import {Provider} from 'react-redux'
import store from './redux/store'
import MainLayoutProducts from './Layouts/MainLayoutProducts';
import DetailedProduct from './pages/DetailedProduct';
import Reports from './pages/Reports';

import {BrowserRouter,Routes,Route} from 'react-router-dom'
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
      {/*<MainLayoutBusiness>
        <Home/>
      </MainLayoutBusiness>*/}
      {/*<MainLayoutProducts>
        <Products/>
      </MainLayoutProducts>*/}
      <Route exact path="/"
      element={
        <MainLayoutProducts>
          <DetailedProduct/>
        </MainLayoutProducts>}>
          
        </Route>
        <Route path="/products"
        element={
          <MainLayoutProducts>
            <DetailedProduct/>
          </MainLayoutProducts>
        }
        >
          
        </Route>
        <Route path="/reports"
        element={
          <MainLayoutProducts>
            <Reports/>
          </MainLayoutProducts>
        }>
          
        </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
