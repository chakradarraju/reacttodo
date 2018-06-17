import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function DeleteButton(onClick) {
  return <input type='button' value='x' onClick={onClick} />
}

function Item(item, onClick) {
  return (
    <li key={item}>{DeleteButton(onClick)}{item}</li>
  );
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newitem: '',
    };
  }

  addItem() {
    var newitem = this.state.newitem;
    if (!newitem || newitem.length == 0) return;
    const newitems = this.state.items.slice();
    newitems.push(newitem);
    this.setState({
      items: newitems,
      newitem: '',
    });
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

  onchange = (e) => {
    this.setState({newitem: e.currentTarget.value});
  }

  render() {
    var self = this;
    return (
      <div>
        <input id='newitem' value={this.state.newitem} onChange={this.onchange} onKeyPress={e => this.onkeypress(e)} />
        <input type='button' value='Add' onClick={() => this.addItem()} />
        <ul id='list'>
          {this.state.items.map(function(item, idx) { return Item(item, self.removeItem.bind(self, idx)); })}
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
