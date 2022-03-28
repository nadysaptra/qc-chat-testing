import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoleInterceptor } from '../role.interceptor';
import { SharedModule } from '../shared/shared.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule, NbLayoutModule, NbChatModule } from '@nebular/theme';

@NgModule({
    declarations: [
        CustomerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        CustomerRoutingModule,
        SharedModule,

        NbThemeModule.forRoot({ name: 'default' }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbChatModule.forChild(),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RoleInterceptor,
            multi: true,
        },
    ],
    bootstrap: [CustomerComponent]
})
export class CustomerModule { }
