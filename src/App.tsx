import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { loadTheme } from './utils/themeHelper';
import Sign from './components/Sign/Sign';
import Homepage from './components/Homepage/Home';
import Document from './components/Document/Document';
import './App.css'
import { useEffect } from 'react';
import Help from './components/Help/Help';

function App() {
  useEffect(() => {
    loadTheme();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sign />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/document" element={<Document/>}/>
        <Route path="/help" element={<Help/>}/>
      </Routes>
    </Router>
  );
}

export default App;
