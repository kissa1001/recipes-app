import React, { useState } from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import useForm from "react-hook-form";
import { Auth } from "aws-amplify";

const SignUpForm = props => {
  const [isLoading, setLoading] = useState(false);

  const handleSignup = async values => {
    setLoading(true);
    try {
      const newUser = await Auth.signUp({
        username: values.email,
        password: values.password
      });
      props.setCredentials({
        username: values.email,
        password: values.password
      });
      props.setNewUser(newUser);
    } catch (e) {
      alert(e.message);
    }
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });

  return (
    <form onSubmit={handleSubmit(handleSignup)}>
      <FormGroup controlId="email" bsSize="large">
        <ControlLabel>Email</ControlLabel>
        <br />
        <input type="email" name="email" ref={register({ required: true })} />
        {errors.email && "Email is required."}
      </FormGroup>
      <FormGroup controlId="password" bsSize="large">
        <ControlLabel>Password</ControlLabel>
        <br />
        <input
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && "Password is required."}
      </FormGroup>
      <LoaderButton
        block
        bsSize="large"
        type="submit"
        isLoading={isLoading}
        text="Signup"
        loadingText="Signing up…"
      />
    </form>
  );
};

export default SignUpForm;
