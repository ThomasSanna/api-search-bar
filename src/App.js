import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home.jsx'
import Episode from './pages/Episode.jsx';
import Apropos from './pages/Apropos.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/:id' element={<Home  />}></Route>
          <Route path='/episodes' element={<Episode  />}></Route>
          <Route path='/episodes/:id' element={<Episode  />}></Route>
          <Route path='/apropos' element={<Apropos  />}></Route>
          <Route path='*' element={<Home  />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;