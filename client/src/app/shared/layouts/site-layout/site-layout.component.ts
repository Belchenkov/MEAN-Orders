import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {Router} from "@angular/router";

import {AuthService} from "../../services/auth.service";
import {MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements AfterViewInit {

  @ViewChild('floatingBtn') floatingBtnRef: ElementRef;

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

  ngAfterViewInit() {
    MaterialService.initializeFloatingButton(this.floatingBtnRef);
  }

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
