import React from 'react';
// app
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from 'react-router-dom';
// styling
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './movie-view.scss';


export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    // creates state variables that will be used to add/remove a movie from a users Favorites list
    this.state = {
      FavoriteMovies: [],
      userDetails: []
    }

    this.addFavorite = this.addFavorite.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.getUserDetails = this.getUserDetails.bind(this);
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUserDetails(accessToken);
  }

  getUserDetails() {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios.get(`https://myflixapi-0196.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((response) => {
      console.log(response.data);
      this.props.setUser(response.user);
      this.setState({
        userDetails: response.data,
        FavoriteMovies: response.data.FavoriteMovies
      });
    }).catch(function (error) {
      console.log(error);
    });
  }

  addFavorite() {
    let token = localStorage.getItem('token');
    axios.post(`https://myflixapi-0196.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      window.open(`/movies/${this.props.movie._id}`, '_self');
    }).catch(function (error) {
      console.log(error);
    });
  }

  removeFavorite() {
    let token = localStorage.getItem('token');
    axios.delete(`https://myflixapi-0196.herokuapp.com/users/${this.props.user}/movies/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => {
      window.open(`/movies/${this.props.movie._id}`, '_self');
    }).catch(function (error) {
      console.log(error);
    });
  }


  render() {
    const { movie, onBackClick } = this.props;

    let tempArray = this.state.FavoriteMovies;
    let isFavoriteNew = false
    if (tempArray.includes(this.props.movie._id)) {
      isFavoriteNew = true;
    } else {
      isFavoriteNew = false;
    };

    return (
      <Container fluid className="moviesContainer">
        <Row>
          <Col>
            <div className="movie-view">
              <div className="movie-poster">
                <img src={movie.ImagePath} />
              </div>
              <div className="movie-title">
                <span className="label">Title: </span>
                <span className="value">{movie.Title}</span>
              </div>
              <div className="movie-description">
                <span className="label">Description: </span>
                <span className="value">{movie.Description}</span>
              </div>
              <div className="movie-genre">
                <span className="label">Genre: </span>
                <Link to={`/genres/${movie.Genre.Name}`}>
                  <Button variant="link">{movie.Genre.Name}</Button>
                </Link>
              </div>
              <div className="movie-director">
                <span className="label">Director: </span>
                <Link to={`/directors/${movie.Director.Name}`}>
                  <Button variant="link">{movie.Director.Name}</Button>
                </Link>
              </div>

              <Button variant='outline-light' onClick={this.removeFavorite}> Remove from Favorites </Button>
              <Button variant='outline-light' onClick={this.addFavorite}> Add to Favorites </Button>
              <Button variant="outline-light" onClick={() => onBackClick(null)}> Back </Button>

            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}