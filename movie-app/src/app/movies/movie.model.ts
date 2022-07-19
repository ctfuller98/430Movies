export class Movie {
    public id: string;
    public title:string;
    public rating:string;
    public imgurl: string;
    public score:string;
    public review: string;
    constructor(id:any, title:any, rating:any, imgurl: any, score: any, review: any) {
       this.id = id
       this.title = title
       this.rating = rating
       this.imgurl = imgurl
       this.score = score
       this.review = review;
   }
}