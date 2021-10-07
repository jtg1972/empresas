import logo from './logo.svg';
import './App.scss';
import Navbar from './components/Navbar';
import MainLayout from './Layouts/MainLayout';
import Home from './pages/Business';
import {Provider} from 'react-redux'
import store from './redux/store'
function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Home/>
      </MainLayout>
    </Provider>
  );
}

export default App;
