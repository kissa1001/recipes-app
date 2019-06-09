import React, { useState } from "react";
import { FormGroup, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import useForm from "react-hook-form";
import { Auth } from "aws-amplify";
import "./Signin.css";

const Signin = props => {
  const [isLoading, setLoading] = useState(false);

  const handleSignin = async values => {
    setLoading(true);
    try {
      await Auth.signIn(values.email, values.password);
      props.setAuthenticated(true);
    } catch (e) {
      alert(e.message);
      setLoading(true);
    }
  };

  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });

  return (
    <div className="Signin">
      <form onSubmit={handleSubmit(handleSignin)}>
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
          text="Login"
          loadingText="Logging in…"
        />
      </form>
    </div>
  );
};

export default Signin;
