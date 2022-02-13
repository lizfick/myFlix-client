// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

let imgPath = './img';

// makes the new component usable by others; creates MainView component
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Pulp Fiction', Description: 'Two hitmen get involved with a powerful gangster, his overdosing girlfriend, and a desperate boxer in a chain of violence and redemption.', ImagePath: imgPath + 'pulpfiction.jpg', Genre: 'Comedy Drama', Director: 'Quentin Tarantino' },
        { _id: 2, Title: 'The Grand Budapest Hotel', Description: 'The owner of an aging high-class hotel retells his early life adventures serving as the hotels concierge with a lobby boy who becomes his closest confidant. The story involves the theft and recovery of a renaissance painting, and a tense battle of a large family fortune, all during a growing fascist regime.', ImagePath: imgPath + 'grandbudapesthotel.jpg', Genre: 'Comedy Drama', Director: 'Wes Anderson' },
        { _id: 3, Title: 'The Lord of the Rings: The Return of the King', Description: 'Continuing the plot of The Fellowship of the Ring, and The Two Towers, Frodo, Sam, and Gollum venture to Mordor to destroy the One Ring. Gandalf and Aragorn lead their joining forces against Saurons evil army in Minas Tirith.', ImagePath: imgPath + 'pulpfiction.jpg', Genre: 'Fantasy Adventure', Director: 'Peter Jackson' }
      ],
      selectedMovie: null
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // controls what the component displays
  render() {
    const { movies, selectedMovie } = this.state;


    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }

}

export default MainView;