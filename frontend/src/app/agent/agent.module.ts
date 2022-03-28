import { AgentComponent } from './agent.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SharedModule } from '../shared/shared.module';
import { AgentRoutingModule } from './agent-routing.module';

@NgModule({
    declarations: [
        AgentComponent
    ],
    imports: [

        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        AgentRoutingModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        SharedModule
    ],
    bootstrap: [AgentComponent]
})
export class AgentModule { }
