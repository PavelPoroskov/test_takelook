
import React from 'react'

export default
class ComponentWithClassName extends React.Component {

  constructor(props) {
    super(props);
    
    let classname = this.constructor.name;
    if (this.props.className) {
      classname = '' + this.props.className + ' ' + classname;
    }
    this.className = classname;

// //    this.defualtProps["className"] = this.className;
//     this.defualtProps = {
//         className: this.className
//       };
  }

  // defualtProps: {
  //   className: "12"
  // }
}

// console.log("ComponentWithClassName")
// console.dir(ComponentWithClassName)