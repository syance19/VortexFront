
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import {MenubarModule} from 'primeng/menubar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {CardModule} from 'primeng/card';
import { CustomerCreateComponent } from './components/customer-create/customer-create.component';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TableModule} from 'primeng/table';
import {SplitButtonModule} from 'primeng/splitbutton';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {DropdownModule} from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';
import { PaymentListComponent } from './components/payment-list/payment-list.component';
import { PaymentCreateComponent } from './components/payment-create/payment-create.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { environment } from '../environments/environment';
import { HomeUserComponent } from './components/home-user/home-user.component';
import { CustomerEditComponent } from './components/customer-edit/customer-edit.component';
import { ProductEditComponent } from './components/product-edit/product-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CustomerCreateComponent,
    CustomerListComponent,
    ProductCreateComponent,
    ProductListComponent,
    PaymentListComponent,
    PaymentCreateComponent,
    LoginComponent,
    RegisterComponent,
    HomeUserComponent,
    CustomerEditComponent,
    ProductEditComponent,


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MenubarModule,
    InputTextModule,
    CardModule,
    SelectButtonModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    InputNumberModule,
    TableModule,
    DropdownModule,
    PanelModule,
    MessagesModule,
    MessageModule,
    SplitButtonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
