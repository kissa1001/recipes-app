import React, { useState } from "react";
import LoaderButton from "../../components/LoaderButton";
import useForm from "react-hook-form";
import { HelpBlock, FormGroup, ControlLabel } from "react-bootstrap";
import { Auth } from "aws-amplify";

const ConfirmationForm = props => {
  const [isLoading, setLoading] = useState(false);

  const handleConfirmation = async values => {
    setLoading(true);
    try {
      await Auth.confirmSignUp(
        props.credentials.username,
        values.confirmationCode
      );
      await Auth.signIn(props.credentials.username, props.credentials.password);

      props.setAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(false);
    }
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });
  return (
    <form onSubmit={handleSubmit(handleConfirmation)}>
      <FormGroup controlId="confirmationCode" bsSize="large">
        <ControlLabel>Confirmation Code</ControlLabel>
        <br />
        <input
          type="tel"
          name="confirmationCode"
          ref={register({ required: true })}
        />
        {errors.confirmationCode && "Confirmation code is required."}
        <HelpBlock>Please check your email for the code.</HelpBlock>
      </FormGroup>
      <LoaderButton
        block
        bsSize="large"
        type="submit"
        isLoading={isLoading}
        text="Verify"
        loadingText="Verifying…"
      />
    </form>
  );
};

export default ConfirmationForm;
