import React from 'react';
import { CardContent, Typography } from "material-ui";

const ContentDetails = ({ price, inventory }) => (
    <CardContent>
        <Typography component="p">
            Available Stock: {inventory}
        </Typography>
        <Typography component="p">
            Price: Rp {price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")}
        </Typography>
    </CardContent>
)
export default ContentDetails