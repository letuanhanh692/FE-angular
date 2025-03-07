import { AuthGuard } from './../service/authguard.service';
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

import { LayoutstaffComponent } from './staff/layoutstaff/layoutstaff.component';
import { ListmanagentComponent } from './staff/listmanagent/listmanagent.component';
import { LayoutuserComponent } from './user/layoutuser/layoutuser.component';
import { AuthService } from '../service/auth.service';
import { CancelComponent } from './admin/cancel/cancel.component';
import { EditcancelComponent } from './admin/editcancel/editcancel.component';
import { CanceldetailComponent } from './admin/canceldetail/canceldetail.component';
import { UserinforComponent } from './user/userinfor/userinfor.component';
import { TripTodayComponent } from './user/triptoday/triptoday.component';
import { LoginstaffComponent } from './staff/loginstaff/loginstaff.component';
import { ContactComponent } from './user/contact/contact.component';
import { userInfo } from 'os';
import { RouteschedulesComponent } from './staff/routeschedules/routeschedules.component';
import { SchedulebookingsComponent } from './staff/schedulebookings/schedulebookings.component';
import { OrderListComponent } from './user/orderlist/orderlist.component';
import { SuccessComponent } from './user/success/success.component';







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
            {path :'cancel',component:CancelComponent},
            {path :'editcancel/:id',component:EditcancelComponent},
            {path :'canceldetail/:id',component:CanceldetailComponent},
            {path : 'statistical',component:StatisticalComponent},

        ]
    },
    { path: 'loginadmin', component: LoginComponent },


    {
      path: 'staff',
      component: LayoutstaffComponent,
      canActivate: [AuthGuard],
      children: [
        { path: '', component: ListmanagentComponent, pathMatch: 'full' },
        { path: 'listmanagent', component: ListmanagentComponent },
        { path: 'schedules/:routeId', component: RouteschedulesComponent },
        { path: 'schedules/bookings/:scheduleId', component: SchedulebookingsComponent },
      ]
    },
    { path: 'loginstaff', component: LoginstaffComponent },


    {
      path: 'user',
      component: LayoutuserComponent,
      children: [
        { path: 'register', component: RegisterComponent },
        { path: 'loginuser', component: LoginuserComponent },
        { path: 'searchtrip', component: SearchtripComponent },
        { path: 'triplist', component: TripListComponent },
        { path: 'tripdetail/:id', component: TripdetailComponent },
        { path: 'confirmation', component: ConfirmationComponent},
        {path:  'userinfor', component: UserinforComponent},
        {path:  'triptoday',component: TripTodayComponent},
        {path:  'contact', component: ContactComponent},
        {path:  'orderlist', component: OrderListComponent},
        {path:  'success', component: SuccessComponent},
        { path: '', redirectTo: 'searchtrip', pathMatch: 'full' }
      ]
    }
];
