import React, { useEffect, useState } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import './profile-view.scss';

// parent component that handles the control functions
export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState({
  })

  const favoriteMovieList = movies.filter((movies) => {
  });

  const getUser = () => {
  }

  const handleSubmit = (e) => {
  }

  const removeFav = (id) => {
  }

  const handleUpdate = (e) => {
  };

  useEffect(() => {
  }, [])

  //children
  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email} />
            </Card.Body>
          </Card>

        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <FavoriteMovies favoriteMovieList={favoriteMovieList} />

    </Container>
  );
}