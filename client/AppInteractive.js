
import React from 'react'
import PropTypes from 'prop-types'

import { createSelector } from 'reselect'

import CardsArea from './CardsArea'
import Filter from './Filter'


let data = {
  "studios":[{
    "id":12,
    "name": "Фламинго",
    "price": 1200,
    "view":["https://128121.selcdn.ru/react/1.jpg"],
    "params":["птица","окно"]
    },
    {
    "id":13,
    "name": "Семейная",
    "price": 1800,
    "view":["https://128121.selcdn.ru/react/2.jpg"],
    "params":["камин","качель","окно"]
    },
    {
    "id":15,
    "name": "Ночная",
    "price": 2000,
    "view":["https://128121.selcdn.ru/react/3.jpg"],
    "params":["зеркало","стул","портрет"]
    },
    {
    "id":122,
    "name": "Калибри",
    "price": 1300,
    "view":["https://128121.selcdn.ru/react/4.jpg"],
    "params":["картина","слон","стекло"]
    },
    {
    "id":123,
    "name": "Стильная",
    "price": 1500,
    "view":["https://128121.selcdn.ru/react/5.jpg"],
    "params":["занавес","тумба"]
    },
    {
    "id":100,
    "name": "Лофт",
    "price": 2200,
    "view":["https://128121.selcdn.ru/react/6.jpg"],
    "params":[]
    },
    {
    "id":178,
    "name": "Таганка",
    "price": 1100,
    "view":["https://128121.selcdn.ru/react/7.jpg"],
    "params":["картина","обои","окно"]
    },
    {
    "id":1221,
    "name": "Лондон",
    "price": 1250,
    "view":["https://128121.selcdn.ru/react/8.jpg"],
    "params":["камин","картина","окно"]
    },
    {
    "id":1891,
    "name": "Уют",
    "price": 1450,
    "view":["https://128121.selcdn.ru/react/9.jpg"],
    "params":["камин","обои","картина"]
    }
    ]
};


let studios = data.studios.sort( (a,b) => a.price - b.price );

let minprice = min( ...studios.map( studio => studio.price ) );
let maxprice = max( ...studios.map( studio => studio.price ) );
if (!maxprice) {
  minprice = 0;
  maxprice = 0;
}

let obj = {};
studios.forEach( o_studio => {
  o_studio.params.forEach( str_param => { 
    obj[str_param] = true 
  }) 
});
let params = obj.keys().sort();


includesSubArr( arr, subArr ) {

  for (let j=0; j < subArr.length; j++) {
    if (! arr.includes(subArr[j]) ){
      return false;
    }
  }

  return true;
}

intersectSubArr( arr, subArr ) {

  for (let j=0; j < subArr.length; j++) {
    if (arr.includes(subArr[j]) ){
      return true;
    }
  }

  return false;
}

const selStudios = state => state.studios;
const selMinPrice = state => state.filter.minprice;
const selMaxPrice = state => state.filter.maxprice;
const selParams = state => state.filter.params;
const selFilteredByPriceStep1 = createSelector(
  selStudios,
  selMinPrice,
  selMaxPrice,
  (studios, minprice, maxprice) => 
    studios.filter( studio => 
      minprice <= studio.price && studio.price <= maxprice )
);
const selFilteredByTagsStep2 = createSelector(
  selFilteredByPriceStep1,
  selParams,
  (studios, filter) => {
    if (!filter) {
      return studios;
    }

    return studios.filter( studio => includesSubArr( studio.params, filter ) );
  }
);
const selFilteredStudios = selFilteredByTagsStep2; 


class AppInteractive extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { 
      studios,
      limits: {
        minprice,
        maxprice,
        params
      },
      filter: {
        minprice,
        maxprice,
        params: [],
      }
    };
  }

  handleFilterChange(newFilter) {
    this.setState( (prevState, props) => ({
        filter: {
          ...prevState.filter,
          ...newFilter
        }
      })
    );    
  }

  render() {
//    const all_studios = this.state.studios;
    const limits = this.state.limits;
    const filter = this.state.filter;

    const filtered_studios = selFilteredStudios(this.state);

    return (
      <div className="AppInteractive">
        <CardsArea studios={filtered_studios}/>
        <Filter 
          limits={limits} 
          filter={filter}
          onFilterChange={this.handleFilterChange} 
          />
      </div>
    );
  }
}

export default AppInteractive;