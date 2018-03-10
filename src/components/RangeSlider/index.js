import React from 'react'
import PropTypes from 'prop-types'

import { Slider, Row, Col } from 'antd';
import debounce from 'lodash.debounce'

class RangeSlider extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    const [ lmin, lmax ] = this.props.limits;

    let [ imin, imax ] = [ lmin, lmax ];

    if (this.props.initvalue) {
      let [ tmin, tmax ] = this.props.initvalue;
      if ( !(tmin === undefined || tmax === undefined) ) {
        [ imin, imax ] = [ tmin, tmax ];
      }
    }

    //value = [100,1100];
    this.state = { 
      initvalue: [ imin, imax ],
      value: [ imin, imax ]
    }; 
  }

  handleChange(value) {
    console.log("RangeSlider.handleChange()");
    this.setState( { value: value } );

    this.props.onChange(value);
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
    const stBold = { 'fontWeight': 'bold' };
    const stRight = { 'textAlign': 'right' };

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
            <Slider range inclusive 
              min={lmin}
              max={lmax}
              tipFormatter={null}
              defaultValue={this.state.initvalue} 
              onChange={debounce(this.handleChange,350)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
};

//onAfterChange={debounce(this.handleChange,500)}


// RangeSlider.handleChange()
// RangeSlider::render()
// Filter::render()
// RangeSlider::render()

RangeSlider.propTypes = {
  title: PropTypes.string.isRequired,
  limits: PropTypes.array.isRequired,
  initvalue: PropTypes.array,
  onChange: PropTypes.func.isRequired
};

export default RangeSlider;
