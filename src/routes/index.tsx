import { 
    BrowserRouter, 
    Route, 
    Routes
} from 'react-router-dom'

import { Dashboard } from '@/screens/dashboard'
import { SignIn } from '@/screens/signin'
import { SignUp } from '@/screens/signup'
import { UserAccount } from '@/screens/users/edit'
import { ListIncomes } from '@/screens/incomes/list'
import { AddIncome } from '@/screens/incomes/add'
import { EditIncome } from '@/screens/incomes/edit'
import { Unauthorized } from '@/screens/unauthorized'


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SignIn />}/>

                <Route path="/signup" element={
                        <SignUp />
                    } 
                />

                <Route path="/dashboard" element={<Dashboard />} />
                
                <Route path='/account' element={
                        <UserAccount />
                    } 
                />

                <Route path="/incomes" element={
                        <ListIncomes />
                    } 
                />

                
                <Route path="/incomes/add" element={
                        <AddIncome />
                    } 
                /> 

                <Route path="/icomes/edit/:id" element={
                        <EditIncome />
                    } 
                /> 

                {/* <Route path="/expenses" element={
                        <ListExpenses />
                    } 
                /> */}

                
                {/* <Route path="/expenses/add" element={
                        <AddExpense/>
                    } 
                /> */}

                {/* <Route path="/expense/edit/:id" element={
                        <EditExpense />
                    } 
                /> */}

                <Route path='/unauthorized' element={
                    <Unauthorized />
                } 
                />

            </Routes>

        </BrowserRouter>
    )
}