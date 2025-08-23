import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import AuthLayout from './layouts/AuthLayout'
import AppLayout from './layouts/AppLayout'
import LinkTree from './views/LinkTree'
import ProfileView from './views/ProfileView'

export default function Router() {
    return (

        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path='/auth/login' element={<Login />} />
                    <Route path='/auth/register' element={<Register />} />
                </Route>

                <Route path='/admin' element={<AppLayout />}>
                    <Route index={true} element={<LinkTree />} />
                    <Route path='profile' element={<ProfileView />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}