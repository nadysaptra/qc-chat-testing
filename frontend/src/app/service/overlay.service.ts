/**
 * This will fix the problem with angular mat-dialog and nebular
 * https://www.angularfix.com/2021/09/problem-with-nebular-and-angular.html
 */

import { OverlayContainer } from "@angular/cdk/overlay";
import { Platform } from "@angular/cdk/platform";
import { DOCUMENT } from "@angular/common";
import { Inject, Injectable, OnDestroy } from "@angular/core";

@Injectable()
export class MyOverlayContainer extends OverlayContainer implements OnDestroy {
    constructor(@Inject(DOCUMENT) document: Document, _platform: Platform) {
        super(document, _platform);
    }

    protected _createContainer(): void {
        super._createContainer();
        if (!this._containerElement) {
            return;
        }
        const parent = document.body;
        parent.appendChild(this._containerElement);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        // this._containerElement = null;
    }
}