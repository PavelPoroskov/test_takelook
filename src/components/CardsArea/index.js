import React from 'react'
//import ComponentWithClassName from '../ComponentWithClassName'
import PropTypes from 'prop-types'

import Card from '../Card'

import './index.css'


const CardsArea = class extends React.Component {

  render() {

    const {studios} = this.props;

    return (

      <div className="CardsArea">
        {studios.map( studio => 
          <Card studio={studio} key={studio.id}/>
        )}
      </div>
    )
  }
};

CardsArea.propTypes = {
  studios: PropTypes.array.isRequired
};

export default CardsArea;