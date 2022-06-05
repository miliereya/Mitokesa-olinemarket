import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components';
import { AccountPage, CatalogPage } from './pages';
import { Test } from './test';

function App() {
  return (
    <div className='container'>
      <NavBar />
      <Routes>
        <Route exact path='/test' element={<Test />} />
        <Route exact path='/account' element={<AccountPage />} />
        <Route exact path='/catalog' element={<CatalogPage />} />
      </Routes>
    </div>
  );
}

export default App;
