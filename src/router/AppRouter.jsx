import { Navigate, Outlet } from "react-router-dom";
import { CalendarPage } from "../calendar/pages/CalendarPage";
import { LoginPage } from "../auth/pages/LoginPage";
import { RouteVisibility } from "./RouteVisibilty";



export const getRoutes = [

    {
        path: "auth/login",
        element: 
        <RouteVisibility routePrivate={false}>
            <Outlet/>
        </RouteVisibility>,
        children: [
            {
                
                index: true,
                element: <LoginPage/>
                
            },
            {
                path: '*',
                element: <Navigate to="/auth/login" />
            }
        ]
    },
    {
        path: "/calendar",
        element:
        <RouteVisibility routePrivate={true}>
            <CalendarPage/>,
        </RouteVisibility> 
    },
    {
        path: "*",
        element: <Navigate to="/auth/login"/>,
    }
]