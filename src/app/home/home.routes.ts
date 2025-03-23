import { Routes } from "@angular/router";

export default <Routes>[
    {
        path: '',
        children: [
            // {
            //     path: '',
            //     // loadComponent: () => import('./home.component').then(m => m.HomeComponent),
            //     title: 'Home'
            // },
            {
                path: 'billing',
                loadComponent:() => import('./create-bill/create-bill.component').then(m => m.CreateBillComponent),
                title: 'Create Bill'
            }
        ]
    }
]