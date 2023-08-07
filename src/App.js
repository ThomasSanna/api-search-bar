import { BrowserRouter, HashRouter , Routes, Route } from 'react-router-dom' 
import Home from './pages/Home.jsx'
import Episode from './pages/Episode.jsx';
import Apropos from './pages/Apropos.jsx';

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/episodes' element={<Episode  />}></Route>
          <Route path='/apropos' element={<Apropos  />}></Route>
          <Route path='*' element={<Home  />}></Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;