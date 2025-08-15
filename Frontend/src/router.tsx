import {BrowserRouter, Routes , Route} from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'

export default function Router() {
    return(

        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/auth/login' element={<Login/>} />
                    <Route path='/auth/register' element={<Register/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}