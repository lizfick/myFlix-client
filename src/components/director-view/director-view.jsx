import React from "react";
import axios from 'axios';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from "react-bootstrap";

import "./director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick, movies } = this.props;

    return (
      <Container>
        <br />
        <Card bg="secondary" text="light" border="light" align="center">

          <Card.Body>
            <Card.Title>Director</Card.Title>
            <Card.Text>
              <span className="label">Name: </span>
              <span className="value">{director.Name}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Bio: </span>
              <span className="value">{director.Bio}</span>
            </Card.Text>
            <Card.Text>
              <span className="label">Birth: </span>
              <span className="value">{director.Birth}</span>
            </Card.Text>
            <br />
            <div className="backButton">
              <Button size="md" onClick={() => { onBackClick(null); }}>Back</Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birthyear: PropTypes.string,
    Deathyear: PropTypes.string
  }),
  onBackClick: PropTypes.func.isRequired
};