import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AdminLoginComponent } from './components/admin/admin.component';
import { CustomerAuthComponent } from './components/customer-auth/customer-auth.component';
import { ContactComponent } from './components/contact/contact.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';


export const routes: Routes = [
    {path:'',component:HomeComponent},
    {path:'register',component:CreateAccountComponent},
    {path:'admin',component:AdminLoginComponent},
    {path:'login',component:CustomerAuthComponent},
    {path:'contact',component:ContactComponent},
    {path:'details',component:UserDetailsComponent}
    
];
