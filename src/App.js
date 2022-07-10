import { Routes, Route, Navigate } from 'react-router-dom';
import Nav from './components/Nav';
import Kantin from './components/pages/Kantin';
import Kotak from './components/pages/Kotak';

function App() {
    return (
        <div className='flex flex-col min-h-screen justify-start items-center'>
            <Nav />
            <Routes>
                <Route path='kantin' element={<Kantin />} />
                <Route path='kotak' element={<Kotak />} />
                <Route path='*' element={<Navigate to='/kantin' replace />} />
            </Routes>
        </div>
    );
}

export default App;
