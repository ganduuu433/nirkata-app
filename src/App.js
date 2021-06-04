import logo from './logo.svg';
import './App.css';
import React from 'react';

import Navbar from './Component/Navbar'
import Translate_Indonesia from './Component/Translate_Indonesia';
import Camera from './Component/Camera'
import Footer from './Component/Footer'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
        translateText:""
    }
}

handleCallback = (camText) =>{
  this.setState({
    translateText: [this.state.translateText + camText]
  })
}


  render(){
  const {translateText} = this.state;
  return (
    <div>
      <Navbar/>
      <div className="container">   {/* kontainer komponen utama  */}
      
        <div className="row main-content">
          <div className="col-md-6 col-nopadding">
            <Camera 
              parentCallback={this.handleCallback}
            />
          </div> 
          <div className="col-md-6 col-nopadding">
            <Translate_Indonesia 
                parentCallback={this.handleCallback}
                translate = { translateText }
            />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )};
}

export default App;
