import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthFirebaseService } from 'src/app/services/auth-firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];
 constructor(private authFirebaseService: AuthFirebaseService,private router: Router) {

 }
  ngOnInit() {
      this.items = [
        {
          label: 'VORTEX',
          routerLink: '/'


      },
          {
              label: 'Customers',
              icon: 'pi pi-user',
              items: [{
                      label: 'New',
                      icon: 'pi pi-user-plus',
                      routerLink:'customer/form'
                  },
                  {
                    label:'List',
                    icon: 'pi pi-book',
                    routerLink:'customer/list'


                  }

              ]
          },
          {
              label: 'Product',
              icon: 'pi pi-briefcase',
              items: [
                {
                  label:'Create product',
                  icon:'pi pi-plus',
                  routerLink:'product/form'

                },


                {
                    label:'List',
                    icon: 'pi pi-book',
                    routerLink:'product/list'
              }

            ]
          },
          {
            label:'Payment Method',
            icon: 'pi pi-credit-card',
            items:[
              {
                label: 'New Payment',
                icon:'pi pi-plus',
                routerLink: 'payment/form'
              },
              {
                label:'List',
                icon: 'pi pi-book',
                routerLink:'payment/list'
          }
            ]
          },


      ];
  }


public isAdmin(): boolean{
  if(localStorage.getItem('rol')=='A'){
  return true;
  } else{
    return false;
  }

}

async logout() {
  try {
    await this.authFirebaseService.logoutFirebase();
    localStorage.clear();
    this.router.navigate(['login']);
  } catch (error) {

  }
}
}
