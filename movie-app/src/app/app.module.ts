import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movies/movie-detail/movie-detail.component';
import { MovieListComponent } from './movies/movie-list/movie-list.component';
import { MovieEditComponent } from './movies/movie-edit/movie-edit.component';
import { MovieItemComponent } from './movies/movie-item/movie-item.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MovieDetailComponent,
    MovieListComponent,
    MovieEditComponent,
    MovieItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
