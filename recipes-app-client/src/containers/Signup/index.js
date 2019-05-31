import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import ConfirmationForm from "./ConfirmationForm";
import "./Signup.css";

const Signup = props => {
  const [newUser, setNewUser] = useState(null);
  const [credentials, setCredentials] = useState(null);

  return (
    <div className="Signup">
      {newUser === null ? (
        <SignUpForm setNewUser={setNewUser} setCredentials={setCredentials} />
      ) : (
        <ConfirmationForm
          newUser={newUser}
          credentials={credentials}
          setAuthenticated={props.setAuthenticated}
          history={props.history}
        />
      )}
    </div>
  );
};

export default Signup;
