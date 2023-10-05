import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Pagination,
  Stack
} from "@mui/material";

import {useState} from 'react';

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
  randomRecipes: IRecipe[];
  onAdd: (recipe: IRecipe ) => void;
}

const RandomRecipes = ({randomRecipes, onAdd}: Props) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = randomRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const paginate = (e, value:number) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {currentRecipes.map((recipe, idx) => (
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
                  size="small"
                  color="success"
                  onClick={() => onAdd(recipe)}
                >
                  Add
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  color="success"
                  href={`/recipe-info/${recipe.id}`}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Stack mt="100px" alignItems="center">
        {randomRecipes.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(randomRecipes.length / recipesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Container>
  );
};
export default RandomRecipes;