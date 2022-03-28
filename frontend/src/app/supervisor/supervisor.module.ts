import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RoleInterceptor } from '../role.interceptor';
import { SharedModule } from '../shared/shared.module';
import { AssignDialogComponent } from './assign-dialog.component';
import { SupervisorRoutingModule } from './supervisor-routing.module';
import { SupervisorComponent } from './supervisor.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
    declarations: [
        SupervisorComponent,
        AssignDialogComponent
    ],
    imports: [

        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        SupervisorRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedModule
    ],
    exports: [
        AssignDialogComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RoleInterceptor,
            multi: true,
        },
    ],
    bootstrap: [SupervisorComponent]
})
export class SupervisorModule { }
