import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home.jsx'
import Episode from './pages/Episode.jsx';
import Apropos from './pages/Apropos.jsx';
import Jeu from './pages/Jeu.jsx';
import Jeu2 from './pages/Jeu2.jsx';
import RoadToPiece from './pages/RoadToPiece.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/chapitre' element={<Home  />}></Route>
          <Route path='/chapitres' element={<Home  />}></Route>
          <Route path='/chapitre/:id' element={<Home  />}></Route>
          <Route path='/chapitres/:id' element={<Home  />}></Route>
          <Route path='/chap' element={<Home  />}></Route>
          <Route path='/chap/:id' element={<Home  />}></Route>
          <Route path='/:id' element={<Home  />}></Route>
          <Route path='/episodes' element={<Episode  />}></Route>
          <Route path='/episode' element={<Episode  />}></Route>
          <Route path='/episode/:id' element={<Episode  />}></Route>
          <Route path='/ep' element={<Episode  />}></Route>
          <Route path='/ep/:id' element={<Episode  />}></Route>
          <Route path='/episodes/:id' element={<Episode  />}></Route>
          <Route path='/apropos' element={<Apropos  />}></Route>
          <Route path='/a-propos' element={<Apropos  />}></Route>
          <Route path='/about' element={<Apropos  />}></Route>
          <Route path='/jeu' element={<Jeu2  />}></Route>
          <Route path='/enigme' element={<Jeu  />}></Route>
          <Route path='/enigmes' element={<Jeu  />}></Route>
          <Route path='*' element={<Home  />}></Route>
          <Route path='/road-to-piece' element={<RoadToPiece  />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;