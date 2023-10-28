import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableContainerBoxComponent } from './resizable-container-box/resizable-container-box.component';
import { ResizableContainerBoxControllerComponent } from './resizable-container-box-controller/resizable-container-box-controller.component';
import { ClickableContainerBoxComponent } from './clickable-container-box/clickable-container-box.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableContainerBoxComponent,
    ResizableContainerBoxControllerComponent,
    ClickableContainerBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
