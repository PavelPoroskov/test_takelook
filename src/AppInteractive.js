
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

let minprice = Math.min( ...studios.map( studio => studio.price ) );
let maxprice = Math.max( ...studios.map( studio => studio.price ) );
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
let params = Object.keys(obj).sort();


function includesSubArr( arr, subArr ) {

  for (let j=0; j < subArr.length; j++) {
    if (! arr.includes(subArr[j]) ){
      return false;
    }
  }

  return true;
}

function intersectsSubArr( arr, subArr ) {

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
    // this.state = { 
    //   studios,
    //   limits: {
    //     minprice,
    //     maxprice,
    //     params
    //   },
    //   filter: {
    //     minprice,
    //     maxprice,
    //     params: [],
    //   }
    // };
    this.state = { 
      loadstart: false,
      // loadend: false,
      // loadsuccess: false,
      loadend: true,
      loadsuccess: true,

      studios:[],
      limits: {
        minprice: 0,
        maxprice: 0,
        params: []
      },
      filter: {
        minprice: 0,
        maxprice: 0,
        params: []
      }
    };

//    fetch();
  }


  componentDidMount() {

    let url = 'http://localhost:8080/studios.json';

    let sHref = localation.href;
    let pos = sHref.lastIndexOf("/");
    if ( 0 <= pos ) {
      url = sHref.slice(0,pos+1) + 'studios.json';
    }

    const msTimeout = 1000;


    this.setState( prevState => ({
      loadstart: true
    });


    var promiseFetch = fetch(url);

    var timeoutErr = new Promise( (resolve, reject) => {
      setTimeout( reject, msTimeout, "Timeout error" );
    });

    Promise.race([promiseFetch, timeoutErr])
    .then( response => response.json() )
    .then( responseJSON => {

      let studios = responseJSON.studios.sort( (a,b) => a.price - b.price );

      let minprice = Math.min( ...studios.map( studio => studio.price ) );
      let maxprice = Math.max( ...studios.map( studio => studio.price ) );
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
      let params = Object.keys(obj).sort();


      this.setState( prevState => ({
          loadend: true,
          loadsuccess: true,
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
      });

    })
    .catch( error => {

      console.error(error);

      this.setState( prevState => ({
          loadend: true,
          loadsuccess: false
      });

    });

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

    const loadstart = this.state.loadstart;
    const loadend = this.state.loadend;
    const loadsuccess = this.state.loadsuccess;

    const limits = this.state.limits;
    const filter = this.state.filter;
    const filtered_studios = selFilteredStudios(this.state);

    return (
      <div className="AppInteractive">

        { (loadstart && !loadend) &&
        <div className="Message MessageInfo">Loading ...</div>
        }

        { (loadend && !loadsuccess) &&
        <div className="Message MessageError">Error on loading.</div>
        }

        { (loadend && loadsuccess) &&
        <CardsArea studios={filtered_studios}/>
        <Filter 
          limits={limits} 
          filter={filter}
          onFilterChange={this.handleFilterChange} 
          />
        }
      </div>
    );
  }
}

export default AppInteractive;