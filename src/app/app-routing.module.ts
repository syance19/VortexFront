import { ProductEditComponent } from './components/product-edit/product-edit.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentCreateComponent } from './components/payment-create/payment-create.component';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes=[
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path:'customer/form', component:CustomerCreateComponent},
  {path:'customer/edit/:id', component:CustomerEditComponent},
  {path:'customer/list', component:CustomerListComponent},
  {path:'product/form', component:ProductCreateComponent},
  {path:'product/edit/:id', component:ProductEditComponent},
  {path:'product/list', component:ProductListComponent},
  {path:'payment/form', component: PaymentCreateComponent},
  {path:'payment/form/:id', component: PaymentCreateComponent},
  {path:'payment/list', component: PaymentListComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home', component:HeaderComponent},
  {path:'home-user', component:HomeUserComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
