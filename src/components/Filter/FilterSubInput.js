import React from 'react'

function FilterSubInput (WrappedComponent, strFilterField,
  limits, changeFilter, initvalue ) {

  const newComponent = class extends React.Component {
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
        <div className="FilterSubInput"> 
          <WrappedComponent 
            limits={limits[strFilterField]}
            onChange={this.handleChange}
            initvalue={initvalue[strFilterField]} 
            {...this.props} />
        </div>
      );
    }

  };


  function getDisplayName(Component) {
    return Component.displayName || Component.name || 'Component';
  }
  
  newComponent.displayName = `FilterSubInput(${getDisplayName(WrappedComponent)})`;

  return newComponent;
}

export default FilterSubInput;