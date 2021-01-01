import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import StreamForm from "./StreamForm";
import { fetchStream, editStream } from "../../actions";
class StreamEdit extends React.Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
  }
  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };
  render() {
    if (!this.props.stream) return null;
    return (
      <StreamForm
        onSubmit={this.onSubmit}
        initialValues={_.pick(this.props.stream, "title", "description")}
      />
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};
export default connect(mapStateToProps, {
  fetchStream,
  editStream,
})(StreamEdit);
