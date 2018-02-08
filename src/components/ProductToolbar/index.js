import React, { Component } from 'react';
import { MenuItem, TextField, Typography } from "material-ui";
import withStyles from 'material-ui/styles/withStyles';

const Styles = theme => ({
    selectField: {
        width: '17%',
        float: 'right',
        marginTop: '0%',
        [theme.breakpoints.down('md')]: {
            width: '28%',
            float: 'right',
            marginTop: '0%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '33%',
            float: 'right',
            marginTop: '0%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '50%',
            float: 'right',
            marginTop: '0%'
        }
    }
})


class ProdToolBar extends Component {
    constructor() {
        super()
        this.state = {
            winWidth: window.innerWidth
        }
    }

    handleWinWidth = () => {
        this.setState({ winWidth: window.innerWidth })
    }
    componentDidMount() {
        window.addEventListener('resize', this.handleWinWidth)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleWinWidth)
    }

    render() {
        const { classes, options, selected, onSelectSort } = this.props
        return (
            <div>
                <div>
                {this.state.winWidth < 911 && <Typography variant="headline" gutterBottom>New In: Clothing</Typography>}
                    <TextField
                        id="select-sort"
                        select
                        label="Sort By"
                        value={!selected ? 0 : selected}
                        onChange={(e) => onSelectSort(e.target.value)}
                        margin="normal"
                        className={classes.selectField}
                    >
                        {options.map(option => (
                            <MenuItem key={option.val} value={option.val}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                {this.state.winWidth > 911 && <Typography variant="headline" gutterBottom>New In: Clothing</Typography>}
            </div>
        )
    }
}
export default withStyles(Styles)(ProdToolBar)