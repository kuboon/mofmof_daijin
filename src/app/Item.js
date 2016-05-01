import React from 'react';
import Slider from 'material-ui/Slider';

import Constant from './Constant'

export default class Item extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleSliderChange = this.handleSliderChange.bind(this);
    this.constant = Constant[props.type][props.key_]
  }

  handleSliderChange(e, value) {
    if(value){
      this.props.updateState(value)
    }
  }

  render() {
    const message = (this.constant.start == this.props.value) ? this.constant.before
      : ((this.props.value < this.constant.start) ? this.constant.after.down : this.constant.after.up)
    const name = `${this.props.type}_${this.props.key_}`

    return (
      <div>
        <h3>{this.constant.name}</h3>
        <div className = 'message'>
          <p>{message.up}</p>
          <p>{message.down}</p>
        </div>
        <Slider name={name} value={this.props.value} onChange={this.handleSliderChange} min={0} max={90} step={0.2} style={{'width': "100%"}} />
      </div>
    )
  }
}
