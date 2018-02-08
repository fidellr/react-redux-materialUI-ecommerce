import React from 'react';
import { connect } from "react-redux";
import { onSelectSort } from "../../../actions";
import ProdToolBar from '../../../components/ProductToolbar'

const ProdToolBarContainer = ({ options, selected, onSelectSort }) => {
    return (
        <ProdToolBar
            options={options}
            selected={selected}
            onSelectSort={onSelectSort}
        />
    )
}
const mapStateToProps = (state) => ({
    options: state.sort.options,
    selected: state.sort.selected
})

export default connect(mapStateToProps, { onSelectSort })(ProdToolBarContainer)