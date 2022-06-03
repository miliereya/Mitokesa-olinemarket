import { Route, Routes } from 'react-router-dom'
import { NavBar } from './components';
import { AccountPage } from './pages';
import { Test } from './test';

function App() {
  return (
    <div className='container'>
      <NavBar />
      <Routes>
        <Route exact path='/test' element={<Test />} />
        <Route exact path='/account' element={<AccountPage />} />
      </Routes>
    </div>
  );
}

export default App;
