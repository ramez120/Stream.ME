import React from "react";
import { Container } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import { FormControl, Form, Row, Col, Button, Alert } from "react-bootstrap";
import "./StreamForm.css";
import streamSrc from "../../images/stream.jpg";
class StreamForm extends React.Component {
  renderInput = ({ input, label, meta }) => {
    return (
      <React.Fragment>
        <label className="titles">{label}</label>
        <FormControl {...input} className="mb-3 " autoComplete="off" />
        <div className="mb-3">{this.renderError(meta)}</div>
      </React.Fragment>
    );
  };
  renderError(meta) {
    if (meta.error && meta.touched)
      return (
        <Alert
          variant="danger"
          className="m-auto d-flex justify-content-center"
        >
          {meta.error}
        </Alert>
      );
    return null;
  }
  onSubmit = (formValues) => {
    this.props.onSubmit(formValues);
  }
  render() {
    return (
      <div className="mt-5">
        <Container className="mt-3 ">
          <Row>
            <Col lg="6">
              <Form
                className="mt-3 "
                onSubmit={this.props.handleSubmit(this.onSubmit)}
              >
                <Field
                  name="title"
                  component={this.renderInput}
                  label="Enter a title"
                />
                <Field
                  name="description"
                  component={this.renderInput}
                  label="Enter a description"
                />
                <Button type="submit" variant="secondary" className="mb-3">
                  Submit
                </Button>
              </Form>
            </Col>
            <Col lg="6">
              <img alt="Stream" src={streamSrc} className="stream-img" />
              <div className="tv w-25 m-auto"></div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

// validate form
const formValidate = (formValue) => {
  const errors = {};
  if (!formValue.title) {
    errors.title = "Please enter a title";
  }
  if (!formValue.description) {
    errors.description = "Please enter a description";
  }
  return errors;
};

export default reduxForm({
  form: "streamForm",
  validate: formValidate,
})(StreamForm);


