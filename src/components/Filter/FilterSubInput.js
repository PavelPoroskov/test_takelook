import React from 'react'
import ComponentWithClassName from '../ComponentWithClassName'

function FilterSubInput (WrappedComponent, strFilterField,
  limits, changeFilter, initvalue ) {

  const FilterSubInput_ = class extends ComponentWithClassName {
    constructor(props) {
      super(props);

      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {

      changeFilter({
        [strFilterField]: value
      })
    }

    render() {
//      const { extraProp, ...passThroughProps } = this.props;
      // ... and renders the wrapped component with the fresh data!
      // Notice that we pass through any additional props
      return (
        <WrappedComponent className={this.className}
          limits={limits[strFilterField]}
          onChange={this.handleChange}
          initvalue={initvalue[strFilterField]} 
          {...this.props} />
      );
    }

  };


  function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
  }
  
  FilterSubInput_.displayName = `FilterSubInput_(${getDisplayName(WrappedComponent)})`;

  return FilterSubInput_;
}

export default FilterSubInput;