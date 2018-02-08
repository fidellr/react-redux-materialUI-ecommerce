import React from 'react';
import { CardMedia } from "material-ui";
import withStyles from 'material-ui/styles/withStyles';

const Styles = {
    media: {
        height: 200
    }
}
const MediaDetails = ({ image, title, classes }) => (
    <CardMedia
        image={image}
        title={title}
        className={classes.media}
    />
)
export default withStyles(Styles)(MediaDetails)