import { Routes } from "@angular/router";
import { StoreFrontLayout } from "./layout/store-front-layout/store-front-layout";
import { HomePage } from "./pages/home-page/home-page";
import { NotFoundPage } from "./pages/not-found-page/not-found-page";
import { GenderPage } from "./pages/gender-page/gender-page";
import { ProductPage } from "./pages/product-page/product-page";

export const storeFrontRoutes: Routes = [
    {
        path: '',
        component: StoreFrontLayout,
        children: [
            { path: '', component: HomePage },
            //dinamico para recibir el genero
            { path: 'gender/:gender', component: GenderPage },
            //dinamico para recibir el id del producto
            { path: 'product/:id', component: ProductPage },
            { path: 'not-found', component: NotFoundPage }
        ]
    },
    {
        //cualquier otra ruta que no sea ninguna de las anteriores se redirige a la página de no encontrado
        path: '**',
        redirectTo: 'not-found'
    }
];

export default storeFrontRoutes;