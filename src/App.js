import logo from './logo.svg';
import './App.css';

import Navbar from './Component/Navbar'
import Translate_Indonesia from './Component/Translate_Indonesia';
import Camera from './Component/Camera'
import Footer from './Component/Footer'

function App() {
  return (
    <div>
      <Navbar/>
      <div className="container">   {/* kontainer komponen utama  */}
      
        <div className="row main-content">
          <div className="col-md-6 col-nopadding">
            <Camera/>
          </div> 
          <div className="col-md-6 col-nopadding">
            <Translate_Indonesia/>
          </div> 
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
