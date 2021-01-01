import { useEffect } from "react";

import { connect } from "react-redux";
import { fetchStream } from "../../actions";

const StreamShow = (props) => {
  const { id } = props.match.params;
  const  fetchStream  = props.fetchStream;
  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);
  if (!props.stream) {
    return <div>Loading ..</div>;
  }
  return (
    <div>
      <h2>{props.stream.title}</h2>
      <p>{props.stream.description}</p>
    </div>
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchStream,
})(StreamShow);
