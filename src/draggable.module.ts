import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DraggableDirective } from './draggable.directive';

import { NgModule } from '@angular/core';

@NgModule({
    // Why CommonModule
    // https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-browser-vs-common-module
    imports: [BrowserModule],
    exports: [DraggableDirective],
    declarations: [DraggableDirective]
})
export class DraggableModule { }
