import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { AuthAPIServiceService } from '../../services/auth-apiservice.service';
import { StorageService } from '../../services/storage.service';

interface SlideBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  collapsed: boolean = false;
  screenWidth = 0;

  // auth
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  sliderData = [
    {
      routerLink: 'dashboard',
      icon: 'fa-solid fa-chart-line',
      label: 'Dashboard',
    },
    {
      routerLink: 'users',
      icon: 'fa-solid fa-user-group',
      label: 'Users',
    },
    {
      routerLink: 'hotel',
      icon: 'fa-solid fa-hotel',
      label: 'Hotels',
    },
    {
      routerLink: 'bookedHotel',
      icon: 'fa-solid fa-earth-americas',
      label: 'Booked Hotels',
    },
    {
      routerLink: 'flight',
      icon: 'fa-solid fa-plane',
      label: 'Flights',
    },
    {
      routerLink: 'holiday',
      icon: 'fa-solid fa-passport',
      label: 'Holiday',
    },
    {
      routerLink: 'bookedHoliday',
      icon: 'fa-solid fa-file-invoice',
      label: 'Booked Holidays',
    },
    {
      routerLink: 'tourguid',
      icon: 'fa-solid fa-earth-americas',
      label: 'Tour Guid',
    },
    {
      routerLink: "city",
      icon:"fa-solid fa-earth-americas",
      label:"City"
    },
  ];

  @Output() onToggleSlideBar: EventEmitter<SlideBarToggle> = new EventEmitter();
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
  }

  closeSlideBar(): void {
    this.collapsed = false;
    this.onToggleSlideBar.emit({
      collapsed: this.collapsed,
      screenWidth: this.screenWidth,
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapsed = false;
    }
  }
  constructor(
    private storageService: StorageService,
    private authService: AuthAPIServiceService
  ) {
    this.isLoggedIn = this.storageService.getUser().user ? true : false;
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    // auth
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
