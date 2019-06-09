import React, { useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton";
import { s3Upload } from "../../libs/awsLib";
import config from "../../config";

import "./Recipe.css";

const Recipe = props => {
  let file = null;
  const [recipe, setRecipe] = useState(null);
  const [content, setContent] = useState("");
  const [attachmentURL, setattachmentURL] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const [isDeleting, setisDeleting] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        let attachmentURL;
        const recipe = await getRecipe();
        const { content, attachment } = recipe;

        if (attachment) {
          attachmentURL = await Storage.vault.get(attachment);
        }
        setRecipe(recipe);
        setContent(content);
        setattachmentURL(attachmentURL);
      } catch (e) {
        alert(e);
      }
    })();
  }, []);

  const getRecipe = () => {
    return API.get("recipes", `/recipes/${props.match.params.id}`);
  };

  const validateForm = () => {
    return content.length > 0;
  };

  const formatFilename = str => {
    return str.replace(/^\w+-/, "");
  };

  const saveRecipe = recipe => {
    return API.put("recipes", `/recipes/${props.match.params.id}`, {
      body: recipe
    });
  };

  const handleSubmit = async event => {
    let attachment;

    event.preventDefault();

    if (file && file.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setisLoading(true);

    try {
      if (file) {
        attachment = await s3Upload(file);
      }

      await saveRecipe({
        content: content,
        attachment: attachment || recipe.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setisLoading(false);
    }
  };

  const handleDelete = async event => {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) {
      return;
    }

    setisDeleting(true);
  };

  return (
    <div className="recipes">
      {recipe && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              onChange={event => setContent(event.target.value)}
              value={content}
              componentClass="textarea"
            />
          </FormGroup>
          {recipe.attachment && (
            <FormGroup>
              <ControlLabel>Attachment</ControlLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={attachmentURL}
                >
                  {formatFilename(recipe.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!recipe.attachment && <ControlLabel>Attachment</ControlLabel>}
            <FormControl
              onChange={event => (file = event.target.files[0])}
              type="file"
            />
          </FormGroup>
          <LoaderButton
            block
            bsStyle="primary"
            bsSize="large"
            disabled={!validateForm()}
            type="submit"
            isLoading={isLoading}
            text="Save"
            loadingText="Saving…"
          />
          <LoaderButton
            block
            bsStyle="danger"
            bsSize="large"
            isLoading={isDeleting}
            onClick={handleDelete}
            text="Delete"
            loadingText="Deleting…"
          />
        </form>
      )}
    </div>
  );
};

export default Recipe;
