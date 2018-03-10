import React from 'react'
import PropTypes from 'prop-types'

import { Row } from 'antd';

import Card from '../Card'

import './index.css'


const CardsArea = ({studios}) => (

  <Row className="CardsArea">
    {studios.map( studio => 
      <Card studio={studio} key={studio.id}/>
    )}
  </Row>
);

CardsArea.propTypes = {
  studios: PropTypes.array.isRequired
};

export default CardsArea;