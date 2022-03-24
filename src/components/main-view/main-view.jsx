// myFlix-client/src/main-view/main-view.jsx

// app
import React from 'react';
import axios from 'axios';
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { setMovies } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

// components
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
// import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { NavbarView } from '../navbar-view/navbar-view';
import { ProfileView } from '../profile-view/profile-view';

// styling
import './main-view.scss';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// makes the new component usable by others; creates MainView component
class MainView extends React.Component {

  constructor() {
    super();
    // initial state is set to null
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://myflixapi-0196.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        // Assign the result to the state
        // this.setState({
        //   movies: response.data
        // });
        // Setting state in redux
        this.props.setMovies(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // when movie is clicked, this function is invoked and updates the state of 'selectedMovie' property to that movie
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // controls what the component displays
  render() {
    let { movies } = this.props;
    let { user } = this.state;

    return (
      <Router>
        <NavbarView user={user} />
        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;
            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            return (
              <Col>
                <RegistrationView Username={user} />
              </Col>
            )
          }} />

          <Route path="/profile" render={({ history }) => {
            if (!user) {
              return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              );
            }

            return (
              <Col md={8}>
                <ProfileView movies={movies} onBackClick={() => history.goBack()} />
              </Col>
            );
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {

            return <Col md={8}>
              <MovieView movie={this.props.movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route exact path="/genres/:name" render={({ match }) => {
            if (this.props.movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <GenreView Genre={this.props.movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
            return <Col md={8}>
              <DirectorView director={this.props.movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

        </Row>
      </Router>
    );
  }
}

let mapStateToProps = state => {
  return { movies: state.movies }
}

export default connect(mapStateToProps, { setMovies })(MainView);