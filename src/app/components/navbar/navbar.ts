import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { 
  NgbDropdown,
	NgbDropdownToggle,
	NgbDropdownMenu,
	NgbDropdownItem,
	NgbDropdownButtonItem,
  NgbNavContent,
	NgbNav,
	NgbNavItem,
	NgbNavItemRole,
	NgbNavLinkButton,
	NgbNavLinkBase,
	NgbNavOutlet
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink, 
    RouterLinkActive,
    // NgbNavContent,
		NgbNav,
		NgbNavItem,
		NgbNavItemRole,
		// NgbNavLinkButton,
		NgbNavLinkBase,
		NgbNavOutlet,
		NgbDropdown,
		NgbDropdownToggle,
		NgbDropdownMenu,
		NgbDropdownItem,
		// NgbDropdownButtonItem
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  router = inject(Router);
  isCollapsed = true;

  login() {
    this.router.navigate(['login']);
  }

  logout() {
    console.log('Logout clicked');
    // this.authService.signOut();
    // this.authService.removeUser();
  }
}
