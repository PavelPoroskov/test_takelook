import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from 'antd';
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

    let classname = this.constructor.name;
    if (this.props.className) {
      classname = '' + this.props.className + ' ' + classname;
    }
    this.classname = classname;
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
    const stDiv1 = { 
      'margin-bottom': '24px'
    };
    const stDiv11 = { 
      width: '50%',
      float: 'left',
      'fontWeight': 'bold'
    };
    const stDiv12 = { 
      width: '50%', 
      float: 'left',
      'textAlign': 'right'
    };
    const stDiv2 = { 
      width: '100%' 
    };

    return (
      <div className={this.classname}>
        <div style={stDiv1}>
          <div style={stDiv11}>
            {this.props.title}
          </div>
          <div style={stDiv12}>
            { `${vmin}  -  ${vmax}` }
          </div>
        </div>
        <div>
          <div style={stDiv2}>
            <Slider range inclusive 
              min={lmin}
              max={lmax}
              tipFormatter={null}
              defaultValue={this.state.initvalue} 
              onChange={debounce(this.handleChange,350)}
            />
          </div>
        </div>
      </div>
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
