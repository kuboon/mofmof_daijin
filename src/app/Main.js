import React from 'react';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Constant from './Constant'
import Item from './Item'


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default class Main extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.updateState = this.updateState.bind(this)

    this.state = {
      'expenditure': Constant.expenditure.map(function(item){ return item.start }),
      'revenue': Constant.revenue.map(function(item){ return item.start }),
    };
  }

  updateState(kind, key, val){
    var array = this.state[kind]
    array[key] = val
    this.setState({kind : array})
  }

  render() {
    const state = this.state
    const items = type => {
      return Constant[type].map((ex, i) => {
        const update = val => this.updateState(type, i, val)
        return <Item key={i} key_={i} type={type} value={state[type][i]} updateState={update} />
      })
    }
    const sum = type => {
      return this.state[type].reduce((a,b) => a + b)
    }
    const sum_exp = sum('expenditure')
    const sum_rev = sum('revenue')

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <h1>もふもふ大臣</h1>
          <h2>基礎的財政収支 {(sum_exp - sum_rev).toFixed(2)}兆円</h2>
          <p>黒字を目指して頑張ろう！</p>
          <h2>歳出 {sum_exp.toFixed(2)}兆円</h2>
          {items('expenditure')}
          <h2>歳入 {sum_rev.toFixed(2)}兆円</h2>
          {items('revenue')}
        </div>
      </MuiThemeProvider>
    );
  }
}
