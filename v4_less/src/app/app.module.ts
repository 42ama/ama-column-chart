import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app-routes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ResizableContainerBoxComponent } from './resizable-container-box/resizable-container-box.component';
import { ResizableContainerBoxControllerComponent } from './resizable-container-box-controller/resizable-container-box-controller.component';
import { ClickableContainerBoxComponent } from './clickable-container-box/clickable-container-box.component';
import { PageAboutComponent } from './page-about/page-about.component';
import { PageFeaturesComponent } from './page-features/page-features.component';
import { PageContainerBoxComponent } from './page-container-box/page-container-box.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TopPanelComponent } from './top-panel/top-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    ResizableContainerBoxComponent,
    ResizableContainerBoxControllerComponent,
    ClickableContainerBoxComponent,
    PageAboutComponent,
    PageFeaturesComponent,
    PageContainerBoxComponent,
    PageNotFoundComponent,
    TopPanelComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule
    RouterModule.forRoot([
      {path: ROUTES.About.replace(/^\//, ''), component: PageAboutComponent},
      {path: ROUTES.ContainerBox.replace(/^\//, ''), component: PageContainerBoxComponent},
      {path: ROUTES.Features.replace(/^\//, ''), component: PageFeaturesComponent},
      {path: '', redirectTo: ROUTES.About.replace(/^\//, ''), pathMatch: 'full'}, // С корня редириектим на About.
      {path: '**', component: PageNotFoundComponent} // С любой страницы редиректим на 404.
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
