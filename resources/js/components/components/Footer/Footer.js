import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Footer() {
  return (
    <footer>
      <Typography variant="h6" align="center" gutterBottom>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          All copyrights reserved to matchera team
        </Typography>

        <Typography variant="body2" color="textSecondary" align="center">
          {" © "}
          <Link color="inherit" href="https://material-ui.com/"></Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Typography>
    </footer>
  );
}
