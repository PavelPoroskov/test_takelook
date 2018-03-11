import React from 'react'
import PropTypes from 'prop-types'

//import debounce from 'lodash.debounce'

export default 
class TagSearch extends React.Component {
  propTypes: {
    onChange: PropTypes.func.isRequired,
    limits: PropTypes.array.isRequired,
    initvalue: PropTypes.array
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    // const [ lmin, lmax ] = this.props.limits;

    // let [ imin, imax ] = [ lmin, lmax ];

    // if (this.props.initvalue) {
    //   let [ tmin, tmax ] = this.props.initvalue;
    //   if ( !(tmin === undefined || tmax === undefined) ) {
    //     [ imin, imax ] = [ tmin, tmax ];
    //   }
    // }

    //value = [100,1100];
    this.state = { 
      initvalue: this.props.initvalue || [],
      value: this.props.initvalue || []
    }; 

    let classname = this.constructor.name;
    if (this.props.className) {
      classname = '' + this.props.className + ' ' + classname;
    }
    this.classname = classname;
  }

  handleChange(value) {
    console.log("TagSearch.handleChange()");
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

    console.log("TagSearch::render()");

    return (
      <div className={this.classname}>
      </div>
    );
  }
};

