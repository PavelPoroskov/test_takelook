import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'antd';
const { Meta } = Card;


const MyCard = ({studio}) => {

  const { name, view, price } = studio;
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

  const stCenter = { 'text-align': 'center' };

  return (
    <Card style={{ width: 250 }}  
      cover={<img alt={name} src={url} />}
    >
      <Meta title={name} style={stCenter}/>
    </Card>
    )
};

// loading

MyCard.propTypes = {
  studio: PropTypes.object.isRequired
};

export default MyCard;