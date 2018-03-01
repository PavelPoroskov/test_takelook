import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

const CardsArea = ({studios}) => (

  <div className="CardsArea">
    {studios.map( studio => (
        <Card studio={studio} key={studio.id} />
        )
    )}
  </div>
);

CardsArea.propTypes = {
  studios: PropTypes.array.isRequired
};

export default CardsArea;