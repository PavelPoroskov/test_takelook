import React from 'react'
import ComponentWithClassName from '../ComponentWithClassName'

import AppInteracive from '../AppInteractive'

import './index.css'


class App extends ComponentWithClassName {

  render() {
    return (

      <div className={this.className}>
        <div className="AppLogo">
          <img src="https://128121.selcdn.ru/react/logo.png" alt="Logo TakeLook"/>
        </div>
        <AppInteracive />
      </div>
    );
  }
}

export default App;