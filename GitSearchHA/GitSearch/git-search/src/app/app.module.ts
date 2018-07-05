import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';


//components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { RepositoryComponent } from './components/repository/repository.component';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';

//serices
import { SearchService } from "./services/search.service";
import { BookmarksService } from "./services/bookmarks.service";

const appRoutes: Routes = [
    { path: 'search', component: GalleryComponent },
    { path: 'bookmarks', component: BookmarksComponent },
    {
        path: '',
        redirectTo: '/search',
        pathMatch: 'full'
    }
];



@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        GalleryComponent,
        RepositoryComponent,
        BookmarksComponent

    ],
    imports: [
        RouterModule.forRoot(
            appRoutes,
            //{ enableTracing: true } // <-- debugging purposes only
        ),
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [
        SearchService,
        BookmarksService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
