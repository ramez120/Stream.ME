import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Col, Container, Media, Row } from "react-bootstrap";
import { fetchStreams } from "../../actions";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import "./StreamList.css";
class StreamList extends React.Component {
  componentDidMount() {
    this.props.fetchStreams();
  }
  renderedList = () => {
    const allStreams = this.props.streams.map((stream) => {
      return (
        <React.Fragment key={stream.id}>
          <Col md="6">
            <Media as="li">
              <CameraAltIcon style={{ color: "cadetblue", fontSize: "50px" }} />
              <Media.Body className="mx-3 ">
                <h5>{stream.title}</h5>
                <p>{stream.description}</p>
              </Media.Body>
            </Media>
          </Col>
          <Col md="6">{this.renderAdminButtons(stream)}</Col>
        </React.Fragment>
      );
    });
    return allStreams;
  };

  // render only if current user logged in owns stream
  renderAdminButtons = (stream) => {
    if (this.props.currentUserId === stream.userId) {
      return (
        <div className={`mb-2 d-right`}>
          <Link className="button-link" to={`/streams/edit/${stream.id}`}>
            <Button variant="light">Edit</Button>
          </Link>

          <Link className="button-link-two" to={`/streams/delete/${stream.id}`}>
            <Button variant="danger">Delete</Button>
          </Link>
        </div>
      );
    }
    return null;
  };

  // render only if user is signed in
  renderCreateButton = () => {
    if (this.props.isSignedIn) {
      return (
        <div className="d-right">
          <Link to="/streams/new" className="create-link">
            <Button variant="light" className="create-link">
              Create Stream !
            </Button>
          </Link>
        </div>
      );
    }
    return null;
  };
  render() {
    return (
      <Container>
        <ul className="list-unstyled mt-5">
          <Row>{this.renderedList()}</Row>
        </ul>
        <div>{this.renderCreateButton()}</div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn,
  };
};
export default connect(mapStateToProps, {
  fetchStreams,
})(StreamList);
