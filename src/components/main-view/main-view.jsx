// myFlix-client/src/main-view/main-view.jsx

import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

// makes the new component usable by others; creates MainView component
export class MainView extends React.Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     movies: [
  //       { _id: 1, Title: 'Pulp Fiction', Description: 'Two hitmen get involved with a powerful gangster, his overdosing girlfriend, and a desperate boxer in a chain of violence and redemption.', ImagePath: 'https://a.1stdibscdn.com/archivesE/upload/10267513/f_110820711528991424980/1_org_53__master.jpg', Genre: 'Comedy Drama', Director: 'Quentin Tarantino' },
  //       { _id: 2, Title: 'The Grand Budapest Hotel', Description: 'The owner of an aging high-class hotel retells his early life adventures serving as the hotels concierge with a lobby boy who becomes his closest confidant. The story involves the theft and recovery of a renaissance painting, and a tense battle of a large family fortune, all during a growing fascist regime.', ImagePath: 'https://m.media-amazon.com/images/I/51G-6nEIH8L._AC_.jpg', Genre: 'Comedy Drama', Director: 'Wes Anderson' },
  //       { _id: 3, Title: 'The Lord of the Rings: The Return of the King', Description: 'Continuing the plot of The Fellowship of the Ring, and The Two Towers, Frodo, Sam, and Gollum venture to Mordor to destroy the One Ring. Gandalf and Aragorn lead their joining forces against Saurons evil army in Minas Tirith.', ImagePath: 'https://m.media-amazon.com/images/I/71X6YzwV0gL._AC_SY679_.jpg', Genre: 'Fantasy Adventure', Director: 'Peter Jackson' }
  //     ],
  //     selectedMovie: null
  //   }
  // }
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }

  componentDidMount() {
    axios.get('https://[APP-NAME].herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  // controls what the component displays
  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

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