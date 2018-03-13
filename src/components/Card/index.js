import React from 'react';
//import ComponentWithClassName from '../ComponentWithClassName'
import PropTypes from 'prop-types';

//import { Card as AntdCard, Tag } from 'antd';
import { Card as AntdCard } from 'antd';

import './index.css'

const { Meta } = AntdCard;



const Card = class extends React.Component {

  render() {

    //const { name, view } = this.props.studio;
    const { name, view, price } = this.props.studio;
    const url = view[0];

    return (
      <AntdCard className="Card"
        cover={<img alt={name} src={url} />}
      >
        <Meta title={name} />
{/*       <Tag className="Price">{`${price} р.`}</Tag> */}
       <div className="PriceTag">{`${price} р.`}</div>
      </AntdCard>
    )
  }
}

// loading

Card.propTypes = {
  studio: PropTypes.object.isRequired
};

export default Card;