// Interface qui décrit un film
export interface Movie {
    id?: number;
  title: string;    // titre du film
  director?: string ;
  rating?: number
  release_year?: number;     // année de sortie
  category_id?:number;


}

