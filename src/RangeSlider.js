import React from 'react'
import PropTypes from 'prop-types'

import { Slider, Row, Col } from 'antd';
import debounce from 'lodash.debounce'

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    //value = [100,1100];
    this.state = { 
      value: props.value
    }; 
  }

  handleChange([vmin,vmax]) {
    console.log("RangeSlider.handleChange()");
    this.setState( { value: [vmin,vmax] } );

    this.props.onFilterChange({
      minprice: vmin,
      maxprice: vmax
    });
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.limits !== nextProps.limits) {
  //     return true;
  //   }
  //   return false;
  // }

  render() {

    console.log("RangeSlider::render()");

    const [ lmin, lmax ] = this.props.limits;

//    const [ vmin, vmax ] = this.props.value;
//          value={[vmin, vmax]} 
    const [ vmin, vmax ] = this.state.value;

//    const [ vmin, vmax ] = this.props.value;
    const stBold = { 'font-weight': 'bold' };
    const stRight = { 'text-align': 'right' };

    return (
      <React.Fragment>
        <Row>
          <Col span={12} style={stBold}>
            {this.props.title}
          </Col>
          <Col span={12} style={stRight}>
            { `${vmin} - ${vmax}` }
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Slider range  
              min={lmin}
              max={lmax}
              tipFormatter={null}
              defaultValue={this.props.value} 
              onAfterChange={debounce(this.handleChange,250)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

// RangeSlider.handleChange()
// RangeSlider::render()
// Filter::render()
// RangeSlider::render()

RangeSlider.propTypes = {
  title: PropTypes.string.isRequired,
  limits: PropTypes.array.isRequired,
//  value: PropTypes.array.isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default RangeSlider;
