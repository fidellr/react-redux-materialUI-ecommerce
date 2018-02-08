import React, { Component } from 'react';
import { connect } from "react-redux";
import { seeDetail } from "../actions";
import CardDetail from '../containers/ProductDetail/CardDetails'
class ProductDetail extends Component {

    componentDidMount() {
        this.getItemsDetail()
    }
    getItemsDetail = () => {
        const { match, seeDetail } = this.props
        const { params } = match
        return seeDetail(params.prodId)
    }
    render() {
        const { product, match } = this.props
        const { params } = match
        return (
            <div>
                <CardDetail product={product} />
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    product: state.detail
})
export default connect(mapStateToProps, { seeDetail })(ProductDetail)