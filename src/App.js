import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function Item(item, onClick) {
  return (
    <li key={item}><input type='button' value='x' onClick={onClick} />{item}</li>
  );
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  addItem() {
    var newitemEl = document.getElementById('newitem');
    var newitem = newitemEl.value;
    if (!newitem || newitem.length == 0) return;
    const newitems = this.state.items.slice();
    newitems.push(newitem);
    this.setState({
      items: newitems,
    });
    newitemEl.value = '';
    newitemEl.focus();
  }

  removeItem(i) {
    this.state.items.splice(i, 1);
    this.setState({
      items: this.state.items,
    });
  }

  onkeypress(e) {
    if (e.nativeEvent.keyCode !== 13) return;
    this.addItem();
  }

  render() {
    var self = this;
    return (
      <div>
        <input id='newitem' onKeyPress={e => this.onkeypress(e) }/>
        <input type='button' value='Add' onClick={() => this.addItem()} />
        <ul id='list'>
          {this.state.items.map(function(item, idx) { return Item(item, (function(i) { return function() { self.removeItem(i); } })(idx)); })}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <div>TODO</div>
        <List></List>
      </div>
    );
  }
}

export default App;
