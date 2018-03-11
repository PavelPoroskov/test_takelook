import React from 'react';
import PropTypes from 'prop-types';


import { Card as AntdCard } from 'antd';

import './index.css'

const { Meta } = AntdCard;



const Card = ({studio}) => {

  const { name, view } = studio;
//  const { name, view, price } = studio;
  const url = view[0];

  // return (
  //   <div className="Card">
  //     <div className="CardView">
  //       {url && <img src={url} /> }
  //     </div>
  //     <div className="CardName">
  //       {name}
  //     </div>
  //     <div className="CardPrice">
  //       { price && 0 < price && "" + price + " р" }
  //     </div>
  //   </div>
  // )

  const stCenter = { 'textAlign': 'center' };

  return (
    <AntdCard className="Card" 
      style={{ width: 250 }}  
      cover={<img alt={name} src={url} />}
    >
      <Meta title={name} style={stCenter}/>
    </AntdCard>
    )
}

// loading

Card.propTypes = {
  studio: PropTypes.object.isRequired
};

export default Card;