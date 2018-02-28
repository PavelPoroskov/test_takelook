import React from 'react'
import PropTypes from 'prop-types'

import InputRange from 'react-input-range';
import debounce from 'lodash.debounce'

Filter.propTypes = {
  limits: PropTypes.object.isRequired,
  filter: PropTypes.object.isRequired,
  onFilterChange: PropTypes.func.isRequired
}


class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleParamsChange = this.handleParamsChange.bind(this);

    // this.state = { 
    //   pricerange: {
    //     min: props.filter.minprice,
    //     max: props.filter.maxprice
    //   },
    //   params: props.filter.params
    // };
  }

  handleRangeChange(newRange) {

//    this.setState({ pricerange: newRange });
    this.props.onFilterChange({
      minprice: newRange.min,
      maxprice: newRange.max
    });
  }

  handleParamsChange(newParams) {

//    this.setState({ params: newParams });
    this.props.onFilterChange({
      params: newParams
    });
  }

  render() {
    console.log("Filter::render()");

//    const all_studios = this.state.studios;
    const limits = this.props.limits;
    const { limit_minprice, limit_maxprice, allparams } = limits;

    const filter = this.props.filter;

    const pricerange = {
      min: filter.minprice,
      max: filter.maxprice
    };
    const params = filter.params;

    return (
      <div className="Filter">
        {/*<SmartSearch allparams={allparams} /> */}
        <InputRange
          minValue={limit_minprice}
          maxValue={limit_maxprice}
          value={pricerange}
          onChange={debounce(this.handleRangeChange, 500)} />
      </div>
    );
  }
};

export default Filter;