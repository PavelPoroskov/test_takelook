import React from 'react'

import { Row } from 'antd';

import AppInteracive from './AppInteractive'

import './App.css'

// const App = () => {

//   return (
//     <div className="App">
//       <div className="AppTitle">
//         <img src="https://128121.selcdn.ru/react/logo.png" />
//       </div>
//       <AppInteracive />
//     </div>
//   );
// }

const App = () => (
  <div className="App">
    <Row className="AppLogo">
      <img src="https://128121.selcdn.ru/react/logo.png" alt="Logo TakeLook"/>
    </Row>
    <Row className="AppMain">
      <AppInteracive />
    </Row>
  </div>
);

export default App;