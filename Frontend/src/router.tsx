import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LoginViews from './views/loginViews'


export default function Router(){
    return(
        <BrowserRouter>
            <Routes>
                <Route>
                    <Route path='/auth/login' element={<LoginViews/>}/>

                </Route>
            </Routes>
        </BrowserRouter>


    )
}   