import React from 'react'
import PropTypes from 'prop-types'

import RangeSlider from './RangeSlider'

class Filter extends React.Component {
  constructor(props) {
    super(props);

//    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleParamsChange = this.handleParamsChange.bind(this);

    // this.state = { 
    //   pricerange: {
    //     min: props.filter.minprice,
    //     max: props.filter.maxprice
    //   },
    //   params: props.filter.params
    // };
  }

//   handleRangeChange([vmin,vmax]) {

// //    this.setState({ pricerange: newRange });
//     this.props.onFilterChange({
//       minprice: vmin,
//       maxprice: vmax
//     });
//   }

  handleParamsChange(newParams) {

//    this.setState({ params: newParams });
    this.props.onFilterChange({
      params: newParams
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.limits !== nextProps.limits) {
      return true;
    }
    return false;
  }

  render() {
    console.log("Filter::render()");

//    const all_studios = this.state.studios;
    const limits = this.props.limits;
    const { minprice: lmin, maxprice: lmax, params: allparams } = limits;

    const filter = this.props.filter;
    const { minprice: vmin, maxprice: vmax, params } = filter;

    const stPadding = { 'padding': '16px' };    

    return (
      <div className="Filter" style={stPadding}>
        <RangeSlider 
          title="Стоимость"
          limits={[lmin, lmax]}
          value={[vmin, vmax]} 
          onFilterChange={this.props.onFilterChange}
        />
      </div>
    );
  }
};



Filter.propTypes = {
  limits: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default Filter;