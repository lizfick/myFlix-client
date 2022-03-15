import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import './profile-view.scss';

// parent component that handles the control functions
export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState(null)

  const favoriteMovieList = movies.filter((movies) => {
  });

  const getUser = async () => {
    let token = localStorage.getItem('token')
    let userFromStorage = localStorage.getItem('user')

    await axios.get(`https://myflixapi-0196.herokuapp.com/users/${userFromStorage}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(userFromResponse => {
        // Assign the result to the state
        setUser(userFromResponse.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // const handleSubmit = (e) => {
  // }

  // const removeFav = (id) => {
  // }

  // const handleUpdate = (e) => {
  // };

  useEffect(() => {
    getUser()
  }, [])

  //children
  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              {/* <UserInfo name={user.Username} email={user.Email} /> */}
              {user?.Username}
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              {/* <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} /> */}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* <FavoriteMovies favoriteMovieList={favoriteMovieList} /> */}

    </Container>
  );
}