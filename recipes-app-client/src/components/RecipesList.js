import React from "react";
import { ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const RecipesList = ({ recipes }) => {
  return [{}].concat(recipes).map((recipe, i) =>
    i !== 0 ? (
      <LinkContainer key={recipe.recipeId} to={`/recipes/${recipe.recipeId}`}>
        <ListGroupItem header={recipe.content.trim().split("\n")[0]}>
          {"Created: " + new Date(recipe.createdAt).toLocaleString()}
        </ListGroupItem>
      </LinkContainer>
    ) : (
      <LinkContainer key="new" to="/recipes/new">
        <ListGroupItem>
          <h4>
            <b>{"\uFF0B"}</b> Create a new recipe
          </h4>
        </ListGroupItem>
      </LinkContainer>
    )
  );
};

export default RecipesList;
