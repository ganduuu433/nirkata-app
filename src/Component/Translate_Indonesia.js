import React from 'react'

class Translate_Indonesia extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      translateText: this.props.translate
    }
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  handleValueChange(event){
    this.setState({
      translateText: event.target.value
    })
    console.log(this.state.translateText)
  }

  render(){
  return (
    <div>
      <nav>
      <div className="nav nav-tabs" id="nav-tab" role="tablist">
        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-indonesia" type="button">Indonesia</button>
      </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active border-tab" id="nav-indonesia" role="tabpanel" aria-labelledby="nav-indonesia-tab">
        <textarea value={ this.props.translate } className="form-control" id="exampleFormControlTextarea1" rows="3">
            
          </textarea> {/* Disini Output Text  */}
        </div>
      </div>
    </div>
  )};
}

export default Translate_Indonesia;
