import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup } from "react-bootstrap";
import RecipesList from "../../components/RecipesList";
import { API } from "aws-amplify";
import "./Home.css";

const Home = ({ authenticated }) => {
  const [isLoading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  useEffect(
    () => {
      (async () => {
        if (!authenticated) {
          return;
        }
        try {
          const recipes = await getRecipes();
          setRecipes(recipes);
        } catch (e) {
          alert(e);
        }
        setLoading(false);
      })();
    },
    [authenticated]
  );

  const getRecipes = () => {
    return API.get("recipes", "/recipes");
  };

  const renderLander = () => {
    return (
      <div className="lander">
        <h1>Yummly</h1>
        <p>A simple recipe taking app</p>
      </div>
    );
  };

  const renderNotes = () => {
    return (
      <div className="recipes">
        <PageHeader>Your Recipes</PageHeader>
        <ListGroup>{!isLoading && <RecipesList recipes={recipes} />}</ListGroup>
      </div>
    );
  };

  return (
    <div className="Home">{authenticated ? renderNotes() : renderLander()}</div>
  );
};
export default Home;
