import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Charts from './components/charts';

function App() {
   return (
       <Router>
           <nav style={{ margin: 10 }}>
               <Link to="/" style={{ padding: 5 }}>
                   Home
               </Link>
               <Link to="/charts" style={{ padding: 5 }}>  {/* Add a link to the Charts page */}
                   Charts
               </Link>
           </nav>
           <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/charts" element={<Charts />} /> {/* Add a route for the Charts page */}
           </Routes>
       </Router>
   );
}
export default App;