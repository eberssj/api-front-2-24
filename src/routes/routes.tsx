import { Route, BrowserRouter, Routes as Switch} from 'react-router-dom';
import Adm from '../pages/Adm';
import PageNotFounded from '../pages/PageNotFounded';
import { PrivateRoutes } from './privateRoutes';
import Login from '../pages/login';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/adm" element={
                    <PrivateRoutes tiposAllowed={[1]}>
                        <Adm />
                    </PrivateRoutes>
                }/>
                    
                <Route path="*" element={<PageNotFounded></PageNotFounded>} />

                <Route path="/login" element={<Login />} />

            </Switch>
        </BrowserRouter>
    )
}