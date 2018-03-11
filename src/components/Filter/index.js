import React from 'react'
import PropTypes from 'prop-types'

//import { Row } from 'antd';

import TagSearch from '../TagSearch'
import RangeSlider from '../RangeSlider'

import FilterSubInput from './FilterSubInput'

import './index.css'

class Filter extends React.Component {
  constructor(props) {
    super(props);

// //    this.handleRangeChange = this.handleRangeChange.bind(this);
//     this.handleParamsChange = this.handleParamsChange.bind(this);

    const fnConnectSubInput = (Comp, strField) => {
      return FilterSubInput( Comp, strField, 
              this.props.limits,
              this.props.onFilterChange,
              this.props.initfilter || {}
            )
    }

    this.ConTagSearch = fnConnectSubInput( TagSearch, "tags" );
    this.ConPriceRangeSlider = fnConnectSubInput( RangeSlider, "pricerange" );
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.limits !== nextProps.limits) {
      return true;
    }
    return false;
  }

  render() {

    const ConTagSearch = this.ConTagSearch;
    const ConPriceRangeSlider = this.ConPriceRangeSlider;

    return (
      <div className={this.constructor.name}>
        <ConTagSearch />
        <ConPriceRangeSlider title="Стоимость" />
      </div>
    );
  }
};



Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  limits: PropTypes.object.isRequired,
  initfilter: PropTypes.object
};

export default Filter;