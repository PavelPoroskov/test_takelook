
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


let studios = data.studios;

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

const selStudios = state => state.studios;
const selFilter = state => state.filter;
const selFilteredStudios = createSelector(
  selStudios,
  selFilter,
  (studios, filter) => {
    if (!filter) {
      return studios;
    }

    filtered_studios = [];
    studios.forEach( one_studio => {

      if ( includesSubArr( one_studio.params, filter ) ) {
        filtered_studios.push(one_studio);
      }
    })

    return filtered_studios;
  }
);


class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.state = { 
      studios,
      params,
      filter: []
    };
  }

  handleFilterChange(newFilter) {
    this.setState({ filter: newFilter });
  }


  render() {
//    const all_studios = this.state.studios;
    const params = this.state.params;
//    const filter = this.state.filter;

    const filtered_studios = selFilteredStudios(this.state);

    return (
      <div className="AppMain">
        <CardsArea studios={filtered_studios}/>
        <Filter params={params} onFilterChange={this.handleFilterChange} />
      </div>
    );
  }
}

export default App;