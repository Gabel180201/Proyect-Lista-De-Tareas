import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import Objetivo from './components/objetivo';
import Header from './components/header';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/objetivo" element={<Objetivo />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
