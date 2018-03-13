import React from 'react'
//import ComponentWithClassName from '../ComponentWithClassName'
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

    this.state = { 
      initvalue: this.props.initvalue || [],
      value: this.props.initvalue || []
    }; 
  }

  handleChange(value) {
//    console.log("TagSearch.handleChange()");
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

//    console.log("TagSearch::render()");

    return (
      <div className="TagSearch">
      </div>
    );
  }
};

