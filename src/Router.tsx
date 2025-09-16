import { Routes, Route} from 'react-router-dom'
import { History } from './pages/History'
import { Home } from './pages/Home'
import { Defaultlayout } from './layouts/DefaultLayout';

export function Router() {
    return (
        <Routes>
            <Route path='/' element={<Defaultlayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/history' element={<History />} />
            </Route>    
        </Routes>
    );
}