import { BookingdetailComponent } from './admin/bookingdetail/bookingdetail.component';
import { AddbusComponent } from './admin/addbus/addbus.component';
import { ListbusComponent } from './admin/listbus/listbus.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from './admin/layout/layout.component';
import { LoginComponent } from './admin/login/login.component';
import path from 'path';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthAdminService } from '../service/authAdmin.service';
import { RouteComponent } from './admin/route/route.component';
import { AddrouteComponent } from './admin/addroute/addroute.component';
import { StatisticalComponent } from './admin/statistical/statistical.component';
import { AdduserComponent } from './admin/adduser/adduser.component';
import { ListuserComponent } from './admin/listuser/listuser.component';
import { EdituserComponent } from './admin/edituser/edituser.component';
import { UserdetailComponent } from './admin/userdetail/userdetail.component';
import { EditrouteComponent } from './admin/editroute/editroute.component';
import { RoutedetailComponent } from './admin/routedetail/routedetail.component';
import { SchedulesComponent } from './admin/schedules/schedules.component';
import { AddschedulesComponent } from './admin/addschedules/addschedules.component';
import { EditschedulesComponent } from './admin/editschedules/editschedules.component';
import { SchedulesdetailComponent } from './admin/schedulesdetail/schedulesdetail.component';
import { EditbusComponent } from './admin/editbus/editbus.component';
import { BusdetailComponent } from './admin/busdetail/busdetail.component';
import { ListbookingComponent } from './admin/listbooking/listbooking.component';
import { AddbookingComponent } from './admin/addbooking/addbooking.component';
import { EditbookingComponent } from './admin/editbooking/editbooking.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginuserComponent } from './user/loginuser/loginuser.component';
import { SearchtripComponent } from './user/searchtrip/searchtrip.component';
import { TripListComponent } from './user/triplist/triplist.component';
import { TripdetailComponent } from './user/tripdetail/tripdetail.component';
import { ConfirmationComponent } from './user/confirmation/confirmation.component';






export const routes: Routes = [
    {
        path: 'admin',
        component: LayoutComponent,canActivate:[AuthAdminService],
        children: [
            { path: '', component: DashboardComponent, pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            {path : 'listuser',component:ListuserComponent},
            {path : 'adduser',component:AdduserComponent},
            {path :'edituser/:id',component:EdituserComponent},
            {path :'userdetail/:id',component:UserdetailComponent},
            {path : 'route',component:RouteComponent},
            {path : 'addroute',component:AddrouteComponent},
            {path :'editroute/:id',component:EditrouteComponent},
            {path :'routedetail/:id',component:RoutedetailComponent},
            {path : 'addroute',component:AddrouteComponent},
            {path : 'schedules',component:SchedulesComponent},
            {path : 'addschedules',component:AddschedulesComponent},
            {path : 'editschedules/:id',component:EditschedulesComponent},
            {path : 'schedulesdetail/:id',component:SchedulesdetailComponent},
            {path :'listbus',component:ListbusComponent},
            {path :'addbus',component:AddbusComponent},
            {path :'editbus/:id',component:EditbusComponent},
            {path :'busdetail/:id',component:BusdetailComponent},
            {path :'listbooking',component:ListbookingComponent},
            {path :'addbooking',component:AddbookingComponent},
            {path :'editbooking/:id',component:EditbookingComponent},
            {path :'bookingdetail/:id',component:BookingdetailComponent},
            {path : 'statistical',component:StatisticalComponent},

        ]
    },
    { path: 'loginadmin', component: LoginComponent },
    {

      path:'user',

      children:[
        {path: 'register',component:RegisterComponent },
        {path: 'loginuser',component:LoginuserComponent},
        {path: 'searchtrip',component:SearchtripComponent},
        {path: 'triplist',component:TripListComponent},
        {path: 'tripdetail/:id',component:TripdetailComponent},
        {path: 'confirmation',component:ConfirmationComponent},
        {path: '', redirectTo: '/trip-list', pathMatch: 'full' },


      ]

    }
];
