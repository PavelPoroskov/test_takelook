import React from 'react'
import PropTypes from 'prop-types'


Card.propTypes = {
  studio: PropTypes.object.isRequired
}

const Card = ({studio}) => {

  const { name, view, price } = studio;
  const view0 = view[0];

  return (
    <div className="Card">
      <div className="CardView">
        {view0 && <img src={view0} /> }
      </div>
      <div className="CardName">
        {name}
      </div>
      <div className="CardPrice">
        { price && 0 < price && "" + price + " р" }
      </div>
    </div>
  )
};

export default Card;