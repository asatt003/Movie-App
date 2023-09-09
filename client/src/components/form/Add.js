import { Button, Box } from "@mui/material";
import * as React from "react";
import TextField from '@mui/material/TextField';
import AppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';


const colorPalette = {
    primaryDark: "#79955a",
    primary: "light blue",
    secondary: "#ffd54f",
    tertiary: "white",
    neutral: "white",
  };
  const StyledLink = styled(Link)({
    textDecoration: "none",
    color: colorPalette.tertiary,
    marginLeft: "1rem",
    "&:hover": {
      color: colorPalette.secondary,
    },
  });
  const StyledAppBar = styled(AppBar)({
    backgroundColor: colorPalette.primaryDark,
  });

export default function AddMovies(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)
        event.target.reset();
        
        let newAdd = {
            title: (formData.get('AddMovies') === null ? "Christopher Hesser" :
                formData.get('AddMovies').toString().length === 0 ? "Christopher Hesser" : formData.get('AddMovies'))
        };

        fetch("http://localhost:8080/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAdd)
        })
            .then((rawResponse) => {
                if (!rawResponse.ok) {
                    throw new Error(
                        `code: ${rawResponse.status}, status text: ${rawResponse.statusText}`
                    );
                }
            return rawResponse.json();
            })
            .then(response => {
                props.setData(response);
            })
            .catch((error) => console.log(error));

    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <div>
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        '& .MuiTextField-root': { width: '25ch' },
                        color: colorPalette.secondary,
                    }}
                    onSubmit={handleSubmit}
                >
                    <Grid container spacing={1}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        '& .MuiTextField-root': { width: '25ch' },
                                    }}>
                                        <p sx={{color: "red"}}>Add a movie to the list:</p>
                                    <TextField name="AddMovies" label={'Add Movie'} id="AddFormMovies" color="success" margin="normal" focused />
                                    {/* <TextField name="WatchedMovies" label={'Watched Movie'} id="WatchedFormMovies" color="success" margin="normal" focused /> */}
                                    <Box
                                        sx={{
                                            padding: '25px'
                                        }}>
                                        <Button
                                            variant="contained"
                                            margin="normal"
                                            type="submit"
                                            color="success"
                                        >Add</Button>
                                    </Box>
                                </Box>
                        </Grid>
                </Box>
            </div>
        </Box>
    );
};