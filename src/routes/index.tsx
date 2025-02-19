import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'

import { Dashboard } from '@/screens/dashboard'
import { ListUsers } from '@/screens/users/list'
import { AddUsers } from '@/screens/users/add'
import { ListProducts } from '@/screens/incomes/list'
import { AddProducts } from '@/screens/incomes/add'
import { EditProduct } from '@/screens/incomes/edit'
import { SignIn } from '@/screens/signin'
import { Unauthorized } from '@/screens/unauthorized'


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                
                <Route path='/account' element={
                        <ListUsers />
                    } 
                />

                <Route path="/signup" element={
                        <AddUsers />
                    } 
                />

                <Route path="/tasks" element={
                        <ListProducts />
                    } 
                />

                <Route path="/projects" element={
                        <AddProducts />
                    } 
                />

                <Route path="/projects/add" element={
                        <AddProducts />
                    } 
                />

                <Route path="/projects/edit/:id" element={
                        <EditProduct />
                    } 
                /> 

                <Route path='/unauthorized' element={
                    <Unauthorized />
                } 
                />

            </Routes>

        </BrowserRouter>
    )
}