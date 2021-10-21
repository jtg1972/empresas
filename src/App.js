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
function App() {
  return (
    <Provider store={store}>
      {/*<MainLayoutBusiness>
        <Home/>
      </MainLayoutBusiness>*/}
      {/*<MainLayoutProducts>
        <Products/>
      </MainLayoutProducts>*/}
      <MainLayoutProducts>
        <DetailedProduct/>
      </MainLayoutProducts>
    </Provider>
  );
}

export default App;
