import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function UserAddedToggleButton(props) {
  const [alignment, setAlignment] = React.useState('all');

  const handleChange = (event, newAlignment) => {
    fetch(`http://localhost:8080?addedByUser=${newAlignment}`)
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

    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="all">All Movies</ToggleButton>
      <ToggleButton value="true">User-Added</ToggleButton>
      <ToggleButton value="false">Auto-Added</ToggleButton>

    </ToggleButtonGroup>
  );
}