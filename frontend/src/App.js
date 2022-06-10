import { Route, Routes } from 'react-router-dom'
import { NavBar, Product } from './components';
import {AccountPage, BlogPage, CatalogPage, CartPage} from './pages';
import { Test } from './test';

function App() {
  return (
    <div className='container'>
      <NavBar />
      <Routes>
        <Route exact path='/test' element={<Test />} />
        <Route exact path='/account' element={<AccountPage />} />
        <Route exact path='/catalog/:sex' element={<CatalogPage />} />
        <Route exact path='/catalog/:collection/:name' element={<Product />} />
        <Route exact path='/blog' element={<BlogPage/>} />
        <Route exact path='/cart' element={<CartPage/>} />
      </Routes>
    </div>
  );
}

export default App;
