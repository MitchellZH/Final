import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  Pagination,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

interface IRecipe {
  id: number;
  title: string;
  readyInMinutes: number;
  img: string;
  summary: string;
  dishTypes: string[];
  healthScore: number;
  ingredients: object[];
  instructions: object[];
}

interface Props {
  searchedRecipes: IRecipe[];
  addRecipe: (recipe: IRecipe) => void;
  handleClick: () => void;
}

const SearchedRecipes = ({ searchedRecipes, addRecipe, handleClick }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = searchedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const paginate = (_e: any, value: number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Search Results
      </Typography>
      <hr style={{ marginBottom: "40px" }} />
      <Grid container spacing={4}>
        {searchedRecipes.length > 1 &&
          currentRecipes.map((recipe, idx) => (
            <Grid item key={idx} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  image={recipe.img}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {recipe.title}
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>Health Score:</b> {recipe.healthScore}
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>Time to cook:</b> {recipe.readyInMinutes}
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>Category:</b>
                    <br></br>|{" "}
                    {recipe.dishTypes.map((dishType) => dishType + " | ")}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="success"
                    sx={{ marginRight: "10px" }}
                    onClick={() => {addRecipe(recipe), handleClick()}}
                  >
                    Save
                  </Button>
                  <Link to={`/recipe-info/${recipe.id}`}>
                    <Button color="info" variant="outlined">
                      View
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
      <Stack mt="100px" alignItems="center">
        {searchedRecipes.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(searchedRecipes.length / recipesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Container>
  );
};
export default SearchedRecipes;
