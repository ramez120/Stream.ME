import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import history from "../../history";
import { Button } from "react-bootstrap";
import ReusableModal from "../../Modal";

const StreamDelete = (props) => {
  console.log(props);
  const { id } = props.match.params;
  const fetchStream = props.fetchStream;
  useEffect(() => {
    fetchStream(id);
  }, [id, fetchStream]);

  const renderContent = () => {
    if (!props.stream) {
      return "Are you sure you want to delete stream?";
    }
    return `Are you sure you want to delete stream : ${props.stream.title} ?`;
  };
  const renderActions = () => {
    return (
      <React.Fragment>
        <Button variant="secondary" onClick={() => history.push("/")}>
          Close
        </Button>
        <Button variant="danger" onClick={() => props.deleteStream(id)}>
          Delete Stream
        </Button>
      </React.Fragment>
    );
  };

  return (
    <ReusableModal
      title="Delete Stream"
      content={` ${renderContent()}`}
      actions={renderActions()}
    />
  );
};
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  deleteStream,
  fetchStream,
})(StreamDelete);
