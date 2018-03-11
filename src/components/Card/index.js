import React from 'react';
import ComponentWithClassName from '../ComponentWithClassName'
import PropTypes from 'prop-types';

import { Card as AntdCard } from 'antd';

import './index.css'

const { Meta } = AntdCard;



const Card = class extends ComponentWithClassName {

  render() {

    const { name, view } = this.props.studio;
    //  const { name, view, price } = studio;
    const url = view[0];

    const stCenter = { 'textAlign': 'center' };

    return (
      <AntdCard className={this.className} 
        style={{ width: 250 }}  
        cover={<img alt={name} src={url} />}
      >
        <Meta title={name} style={stCenter}/>
      </AntdCard>
    )
  }
}

// loading

Card.propTypes = {
  studio: PropTypes.object.isRequired
};

export default Card;