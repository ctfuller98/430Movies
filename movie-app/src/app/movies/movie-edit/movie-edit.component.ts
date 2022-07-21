import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { NgForm} from '@angular/forms';
import { MovieService } from '../movie.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  originalMovie: Movie
  movie: Movie
  editMode: boolean = false
  id: string;
  constructor(private movieService: MovieService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params: Params)=> {
        this.id = params['id']
        if(this.id===null || this.id==undefined){
          this.editMode = false;
          return
        }
        this.originalMovie = this.movieService.getMovie(this.id)
        if(this.originalMovie == undefined || this.originalMovie==null){
            return}
        this.editMode = true
        this.movie = JSON.parse(JSON.stringify(this.originalMovie));
        
      })
    } 
  
  onCancel() {
    this.router.navigate(['/movies'])
  }
  onSubmit(form: NgForm){
      const value = form.value
      const newMovie = new Movie(this.id, value.title, value.rating, value.imgurl, value.score, value.review); 
      if (this.editMode === true){
        this.movieService.updateMovie(this.originalMovie, newMovie)
      } 
      else {
        this.movieService.addMovie(newMovie)
      }
      this.router.navigate(['/movies'])
  }
}
