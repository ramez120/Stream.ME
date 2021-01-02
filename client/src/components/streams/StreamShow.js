import React, { useRef } from "react";
import { useEffect } from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";
import { Container } from "react-bootstrap";

const StreamShow = (props) => {
  const { id } = props.match.params;
  const fetchStream = props.fetchStream;
  let videoRef = useRef();
  let player;

  // check if no stream is available or player already running
  const buildPlayer = (id) => {
    if (!props.stream || player) {
      return;
    }
     // create player
    player = flv.createPlayer({
      type: "flv",
      url: `http://localhost:8000/live/${id}.flv`,
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  };


  // fetch user id
  useEffect(() => {
    fetchStream(id);
  }, [id]);

  // check after fetching id to build player
  useEffect(() => {
    buildPlayer(id);

    // clean player up if exists
    return (() =>{
      if(player)
      player.destroy();
    })
  }, [props.stream]);

  if (!props.stream) {
    return (
     <Container>
    <div>Loading ...</div>
    </Container>)
  }
  return (
    <div>
      <Container>
    <div >
      <video className = "w-100" ref={videoRef} controls></video>
      </div>
      <div>
      <h2>{props.stream.title}</h2>
      <p>{props.stream.description}</p>
      </div>
      </Container>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
