import { Routes } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AddeditUserComponent } from './addedit-user/addedit-user.component';
import { ViwemodeComponent } from './viwemode/viwemode.component';

export const routes: Routes = [

    {
        path:'', redirectTo:'Userlist', pathMatch:'full'
    },
    {
        path:'Userlist', component:UserlistComponent
    },
    {
        path:'AddEditUser/:id', component:AddeditUserComponent
    }
    ,
    {
        path:'view-user/:id', component:ViwemodeComponent
    }
    
];
