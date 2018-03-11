import React from 'react'

import AppInteracive from '../AppInteractive'

import './index.css'

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

// const App = () => (
//   <div className="App">
//     <div>{this.name}</div>
//     <div className="AppLogo">
//       <img src="https://128121.selcdn.ru/react/logo.png" alt="Logo TakeLook"/>
//     </div>
//     <AppInteracive />
//   </div>
// );

function App() {
  return (
    <div className="App">
      <div className="AppLogo">
        <img src="https://128121.selcdn.ru/react/logo.png" alt="Logo TakeLook"/>
      </div>
      <AppInteracive />
    </div>
  )
};


export default App;