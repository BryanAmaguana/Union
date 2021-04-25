/* importacion de los layout */

import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutPublico from '../layouts/LayoutPublico'

/* Importacion paginas Administrador */

import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SignIn/SingIn';
import AdminUsers from '../pages/Admin/Users';
import AdminRol from '../pages/Admin/Rol';
import AdminPersona from '../pages/Admin/Persona';
import AdminBus from '../pages/Admin/Bus';
import AdminTarjeta from '../pages/Admin/Tarjeta';
import AdminRuta from '../pages/Admin/Ruta';
import AdminTipo from '../pages/Admin/Tipo_Pasajero';
import AdminPasajero from '../pages/Admin/Pasajero';
import AdminCobro from '../pages/Admin/CobroPasaje';
import AdminContenido from '../pages/Admin/ContenidoWeb';
import AdminRecarga from '../pages/Admin/Recarga';
  

/* Menu web */
import AdminMenuWeb from "../pages/Admin/MenuWeb"

/* Importacion Publico */
import HomePublico from '../pages/Publico/Home';


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
                path: '/admin/rol',
                component: AdminRol,
                exact: true
            },
            {
                path: '/admin/persona',
                component: AdminPersona,
                exact: true
            },
            {
                path: '/admin/bus',
                component: AdminBus,
                exact: true
            },
            {
                path: '/admin/tarjeta',
                component: AdminTarjeta,
                exact: true
            },
            {
                path: '/admin/ruta',
                component: AdminRuta,
                exact: true
            },
            {
                path: '/admin/tipo',
                component: AdminTipo,
                exact: true
            },
            {
                path: '/admin/pasajero',
                component: AdminPasajero,
                exact: true
            },
            {
                path: '/admin/cobro',
                component: AdminCobro,
                exact: true
            },
            {
                path: '/admin/menuweb',
                component: AdminMenuWeb,
                exact: true
            },
            {
                path: '/admin/contenidoweb',
                component: AdminContenido,
                exact: true
            },
            {
                path: '/admin/recarga',
                component: AdminRecarga,
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
                component: Error404
            }
        ]
    }
]

export default routes;