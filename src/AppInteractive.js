
import React from 'react'
//import PropTypes from 'prop-types'

//import { Row, Col } from 'antd';
import { Col } from 'antd';
import { createSelector } from 'reselect'

import CardsArea from './components/CardsArea'
import Filter from './components/Filter'


function includesSubArr( arr, subArr ) {

  for (let j=0; j < subArr.length; j++) {
    if (! arr.includes(subArr[j]) ){
      return false;
    }
  }

  return true;
}

// function intersectsSubArr( arr, subArr ) {

//   for (let j=0; j < subArr.length; j++) {
//     if (arr.includes(subArr[j]) ){
//       return true;
//     }
//   }

//   return false;
// }

const selStudios = state => state.studios;
const selMinPrice = state => {
  if (state.filter && state.filter.pricerange 
    && state.filter.pricerange[0] !== undefined ) {
    return state.filter.pricerange[0];
  }else{
    return undefined;
  }  
};
const selMaxPrice = state => {
  if (state.filter && state.filter.pricerange 
    && state.filter.pricerange[1] !== undefined ) {
    return state.filter.pricerange[1];
  }else{
    return undefined;
  }  
};
const selTags = state => state.filter.tags;
const selSortedStudios = createSelector(
  selStudios,
  studios => studios.sort( (a,b) => a.price - b.price )
);
const selFilteredByTagsStep = createSelector(
  selSortedStudios,
  selTags,
  (studios, tags) => {
    if (!tags) {
      return studios;
    }

    return studios.filter( studio => includesSubArr( studio.params, tags ) );
  }
);
const selFilteredByPriceStep = createSelector(
  selFilteredByTagsStep,
  selMinPrice,
  selMaxPrice,
  (studios, minprice, maxprice) => {
    if (minprice === undefined || maxprice === undefined) {
      return studios;
    }

    return studios.filter( studio => 
      minprice <= studio.price && studio.price <= maxprice )
  }
);
const selFilteredStudios = selFilteredByPriceStep; 

const selLimits = createSelector(
  selSortedStudios,
  studios => {

    // let minprice = Math.min( ...studios.map( studio => studio.price ) );
    // let maxprice = Math.max( ...studios.map( studio => studio.price ) );
    // if (!maxprice) {
    //   minprice = 0;
    //   maxprice = 0;
    // }

    let minprice = 0;
    let maxprice = 0;
    if ( 0 < studios.length ) {
      minprice = studios[0].price;
      maxprice = studios[studios.length-1].price;
    }

    let obj = {};
    studios.forEach( o_studio => {
      o_studio.params.forEach( str_param => { 
        obj[str_param] = true 
      }) 
    });
    let params = Object.keys(obj).sort();

    return {
      pricerange:[minprice,maxprice],
      tags:params
    };
  }
);


class AppInteractive extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);

    this.state = { 
      loadstart: false,
      loadend: false,
      loadsuccess: false,

      studios:[],

      filter: {}
      // filter: {
      //   minprice: 0,
      //   maxprice: 0,
      //   params: []
      // }
    };
  }


  componentDidMount() {

//    let url = 'http://localhost:8080/studios.json';
    let url = '';

    let sHref = window.location.href;
    let pos = sHref.lastIndexOf("/");
    if ( 0 <= pos ) {
      url = sHref.slice(0,pos+1) + 'studios.json';
    }

    const msTimeout = 1000;


    this.setState( prevState => ({
        loadstart: true
      })
    );


    var promiseFetch = fetch(url);

    var timeoutErr = new Promise( (resolve, reject) => {
      setTimeout( reject, msTimeout, "Timeout error" );
    });

    Promise.race([promiseFetch, timeoutErr])
    .then( response => response.json() )
    .then( responseJSON => {

      this.setState( prevState => ({
          loadend: true,
          loadsuccess: true,
          studios: responseJSON.studios
        })
      );

    })
    .catch( error => {

      console.error(error);

      this.setState( prevState => ({
          loadend: true,
          loadsuccess: false
        })
      );

    });

  }

  handleFilterChange(addFilter) {
    this.setState( (prevState, props) => ({
        filter: {
          ...prevState.filter,
          ...addFilter
        }
      })
    );    
  }

  render() {

    const loadstart = this.state.loadstart;
    const loadend = this.state.loadend;
    const loadsuccess = this.state.loadsuccess;

    const limits = selLimits(this.state);
    //const filter = this.state.filter;
    const filtered_studios = selFilteredStudios(this.state);

    return (
        <React.Fragment>
          { (loadstart && !loadend) &&
          <Col className="Message MessageInfo">Loading ...</Col>
          }

          { (loadend && !loadsuccess) &&
          <Col className="Message MessageError">Error on loading.</Col>
          }

          { (loadend && loadsuccess) &&
          <React.Fragment>
            <Col span={19}>
              <CardsArea studios={filtered_studios} />
            </Col>
            <Col span={5}>
              <Filter 
                limits={limits} 
                onFilterChange={this.handleFilterChange} 
              />
            </Col>
          </React.Fragment>
          }
        </React.Fragment>
    );
  }
}

export default AppInteractive;