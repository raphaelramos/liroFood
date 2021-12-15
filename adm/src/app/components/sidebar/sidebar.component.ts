import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Painel',  icon: 'dashboard', class: '' },
    { path: 'user', title: 'Perfil',  icon: 'person', class: '' },
    { path: 'table-list', title: 'Pedidos',  icon: 'content_paste', class: '' },
    { path: 'typography', title: 'Produtos',  icon: 'library_books', class: '' },
    { path: 'icons', title: 'Restaurante',  icon: 'bubble_chart', class: '' },
    { path: 'maps', title: 'Mapas',  icon: 'location_on', class: '' },
    { path: 'upgrade', title: 'Meu Plano',  icon: 'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() { }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
