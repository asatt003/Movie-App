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

export default function DeleteMovies(props) {

    const handleSubmit = (event) => {
        event.preventDefault();
        var formData = new FormData(event.currentTarget)
        event.target.reset();
        
        let newDelete = {
            title: (formData.get('DeleteMovies') === null ? "Christopher Hesser" :
                formData.get('DeleteMovies').toString().length === 0 ? "Christopher Hesser" : formData.get('DeleteMovies'))
        };

        fetch(`http://localhost:8080?title=${newDelete.title}`, {
            method: "DELETE"
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
                                        <p sx={{color: "red"}}>Delete a movie from the list:</p>
                                    <TextField name="DeleteMovies" label={'Delete Movie'} id="DeleteFormMovies" color="success" margin="normal" focused />
                                    <Box
                                        sx={{
                                            padding: '25px'
                                        }}>
                                        <Button
                                            variant="contained"
                                            margin="normal"
                                            type="submit"
                                            color="success"
                                        >Delete</Button>
                                    </Box>
                                </Box>
                        </Grid>
                </Box>
            </div>
        </Box>
    );
};