import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlMessages } from './control-messages.component';
@NgModule({
    imports: [
    ],
    declarations: [
        ControlMessages
    ],
    exports: [
        ControlMessages
    ]
})
export class SharedModule { }
