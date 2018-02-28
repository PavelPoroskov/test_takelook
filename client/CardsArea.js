import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

CardsArea.propTypes = {
  studios: PropTypes.array.isRequired
}

const CardsArea = ({studios}) => (

  <div className="CardsArea">
    {studios.map( studio => (
        <Card studio={studio} key={studio.id} />
        )
    )}
  </div>
);

export default CardsArea;