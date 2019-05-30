import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import useForm from "../../useForm";
import { Auth } from "aws-amplify";
import "./Signin.css";

const Signin = props => {
  const [isLoading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    try {
      await Auth.signIn(values.email, values.password);
      props.setAuthenticated(true);
      props.history.push("/");
    } catch (e) {
      alert(e.message);
      setLoading(true);
    }
  };

  const { values, handleChange, handleSubmit } = useForm(handleSignin);

  return (
    <div className="Signin">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="email" bsSize="large">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            name="email"
            onChange={handleChange}
            value={values.email}
            required
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            name="password"
            onChange={handleChange}
            value={values.password}
            required
          />
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
