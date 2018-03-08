import React from 'react'
import PropTypes from 'prop-types'

import MyCard from './MyCard'

const CardsArea = ({studios}) => (

  <div className="CardsArea">
    {studios.map( studio => 
      <MyCard studio={studio} key={studio.id}/>
    )}
  </div>
);

CardsArea.propTypes = {
  studios: PropTypes.array.isRequired
};

export default CardsArea;