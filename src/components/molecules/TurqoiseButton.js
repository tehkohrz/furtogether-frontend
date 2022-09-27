import React from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const TurqoiseButton = ({ word, handleFunction }) => {
  return (
    <Button
      onClick={handleFunction}
      sx={{ marginTop: 3, borderRadius: 3 }}
      variant="contained"
      style={{
        backgroundColor: "#3dccc7",
      }}
    >
      {word}
    </Button>
  );
};

TurqoiseButton.propTypes = {
  word: PropTypes.string.isRequired,
  handleFunction: PropTypes.func.isRequired,
};

export { TurqoiseButton };
