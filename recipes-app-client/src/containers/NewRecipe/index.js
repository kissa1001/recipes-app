import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { API } from "aws-amplify";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";
import "./NewRecipe.css";

const NewRecipe = props => {
  const [isLoading, setLoading] = useState(null);
  const [content, setContent] = useState("");
  let file = null;

  const createRecipe = recipe => {
    return API.post("recipes", "/recipes", {
      body: recipe
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }
    setLoading(true);
    try {
      const attachment = file ? await s3Upload(file) : null;

      await createRecipe({
        attachment,
        content: content
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setLoading(false);
    }
  };

  return (
    <div className="NewRecipe">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="content">
          <FormControl
            onChange={event => setContent(event.target.value)}
            value={content}
            componentClass="textarea"
            required
          />
        </FormGroup>
        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
          <FormControl
            onChange={event => (file = event.target.files[0])}
            type="file"
          />
        </FormGroup>
        <LoaderButton
          block
          bsStyle="primary"
          bsSize="large"
          type="submit"
          isLoading={isLoading}
          text="Create"
          loadingText="Creating…"
        />
      </form>
    </div>
  );
};

export default NewRecipe;
