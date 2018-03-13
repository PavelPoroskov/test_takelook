
import React from 'react'
//import ComponentWithClassName from '../ComponentWithClassName'

import CardsArea from '../CardsArea'
import Filter from '../Filter'

import { selFilteredStudios, selLimits } from './selectors'
import './index.css'

import { Layout } from 'antd'
const {  Sider, Content } = Layout;

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
  
      <Layout>
        { (loadstart && !loadend) &&
        <div className="Message MessageInfo">Loading ...</div>
        }

        { (loadend && !loadsuccess) &&
        <div className="Message MessageError">Error on loading.</div>
        }

        { (loadend && loadsuccess) &&
          <React.Fragment>
            <Content>
              <CardsArea studios={filtered_studios} />
            </Content>
            <Sider>
              <Filter 
                limits={limits} 
                onFilterChange={this.handleFilterChange} 
              />
            </Sider>
          </React.Fragment>
        }
      </Layout>
    );
  }
}

export default AppInteractive;