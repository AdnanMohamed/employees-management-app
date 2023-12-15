import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import BusinessIcon from "@mui/icons-material/Business";
import PeopleIcon from "@mui/icons-material/People";
import { Link } from "react-router-dom";

const NavigationCards = () => {
  // Return an array of menu items.
  const getCards = () => {
    const cards = [];

    cards.push(
      {
        title: "Employees",
        icon: <PeopleIcon fontSize="large" />,
        actions: [
          <Link to="/employees">
            <Button variant="outlined" color="primary">
              manage employees
            </Button>
          </Link>,
        ],
      },
      {
        title: "Patients",
        icon: <PeopleIcon fontSize="large" />,
        actions: [
          <Link to="/patients">
            <Button variant="outlined" color="primary">
              manage patients
            </Button>
          </Link>,
        ],
      },
      {
        title: "Departments",
        icon: <BusinessIcon fontSize="large" />,
        actions: [
          <Link to="/departments">
            <Button variant="outlined" color="primary">
              manage departments
            </Button>
          </Link>,
        ],
      }
    );

    return cards;
  };

  const cards = getCards();

  return (
    <section id="menuItems" style={{ padding: "2rem 0" }}>
      <Container>
        <Grid container spacing={3}>
          {cards?.map((card) => (
            <Grid item xs={12} sm={4}>
              <Card>
                <CardHeader
                  title={card.title}
                  titleTypographyProps={{ variant: "h5" }}
                  avatar={<IconButton>{card.icon}</IconButton>}
                />
                <CardContent>
                  <Typography variant="body2"></Typography>
                </CardContent>
                <CardActions>
                  {card.actions?.map((action) => (
                    <>{action}</>
                  ))}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </section>
  );
};

export default NavigationCards;
