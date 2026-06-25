import { Routes } from "@angular/router";
import { AuthLayout } from "./layout/auth-layout/auth-layout";
import { LoginPage } from "./pages/login-page/login-page";
import { RegisterPage } from "./pages/register-page/register-page";

export const authRoutes: Routes = [
    {
        path: "",
        component: AuthLayout,
        children: [
            { path: 'login', title: 'Ingresar', component: LoginPage },
            { path: 'register', title: 'Registrarse', component: RegisterPage },
            { path: '', redirectTo: 'login', pathMatch: 'full' },
        ]
    },
    { path: '**', redirectTo: 'login' },
];

export default authRoutes;
