import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit {

  navLinks = [
    { url: '/overview', name: 'Обзор', icon: 'remove_red_eye' },
    { url: '/analytics', name: 'Аналитика', icon: 'trending_up' },
    { url: '/history', name: 'История', icon: 'today' },
    { url: '/order', name: 'Добавить заказ', icon: 'add_shopping_cart' },
    { url: '/categories', name: 'Ассортимент', icon: 'restaurant_menu' }
  ];

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
