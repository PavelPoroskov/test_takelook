import React from 'react'
import ComponentWithClassName from '../ComponentWithClassName'

import AppInteracive from '../AppInteractive'

import './index.css'

import { Layout } from 'antd'
const {  Header } = Layout;

class App extends ComponentWithClassName {

  render() {
    return (

      <Layout>
        <Header>
          <div className="logo">
            <img src="https://128121.selcdn.ru/react/logo.png" alt="Logo TakeLook"/>
          </div>
        </Header>
        <AppInteracive />
      </Layout>
    );
  }
}

export default App;