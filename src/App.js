import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import Home from './pages/Home.jsx'
import Episode from './pages/Episode.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/episodes' element={<Episode  />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;