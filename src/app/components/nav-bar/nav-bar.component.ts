import {Component, Input} from '@angular/core';
import { StoreService } from '../../services/store.service';
import {User} from "../../models/user.module";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  @Input() user: User = {
    id: '',
    name: '',
    email: '',
    password: ''
  }
  activeMenu = false;
  counter = 0;

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }
}
