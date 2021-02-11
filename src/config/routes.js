/* importacion de los layout */

import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutPersonal from '../layouts/LayoutPersonal'
import LayoutPublico from '../layouts/LayoutPublico'

/* Importacion paginas Administrador */

import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SignIn/SingIn';
import AdminUsers from '../pages/Admin/Users';

/* Importacion Publico */
import HomePublico from '../pages/Publico/Home';
import ContactPublico from '../pages/Publico/Contact';

/* Importacion Personal */
import HomePersonal from '../pages/Personal/Personal';
import PersonalLogin from '../pages/Personal/SingIn';

/* Error 404 */
import Error404 from '../pages/Publico/Error404';

const routes = [
    {
        path: "/admin",
        component: LayoutAdmin,
        exact: false,
        routes: [
            {
                path: "/admin",
                component: AdminHome,
                exact: true
            },
            {
                path: '/admin/login',
                component: AdminSingIn,
                exact: true
            },
            {
                path: '/admin/usuario',
                component: AdminUsers,
                exact: true
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/personal",
        component: LayoutPersonal,
        exact: false,
        routes: [
            {
                path: "/personal",
                component: HomePersonal,
                exact: true
            },
            {
                path: "/personal/login",
                component: PersonalLogin,
                exact: true 
            },
            {
                component: Error404
            }
        ]
    },
    {
        path: "/",
        component: LayoutPublico,
        exact: false,
        routes: [
            {
                path: "/",
                component: HomePublico,
                exact: true
            },
            {
                path: "/contact",
                component: ContactPublico,
                exact: true 
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes;