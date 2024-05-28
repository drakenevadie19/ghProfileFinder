import './App.css';

import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import StartPage from './pages/start-page';
import FindByUserName from './pages/find-by-username';
import FindByName from './pages/find-by-name';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="" element={<StartPage/>} />
          <Route path="/find" >
            <Route path="username" element={<FindByUserName />} />
            <Route path="name" element={<FindByName />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
