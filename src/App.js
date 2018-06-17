import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function DeleteButton(onClick) {
  return <input type='button' value='x' onClick={onClick} />
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
    };
  }

  toggleDone() {
    this.setState({done: !this.state.done});
  }

  render() {
    return (
        ((this.state.done && this.props.showDone) || (!this.state.done && this.props.showPending)) && 
        <li className={this.state.done ? 'done' : ''}
            onClick={() => this.toggleDone()}>
          {DeleteButton(this.props.onClick)} {this.props.item}
        </li>);
  }
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
    this.state.items.push(newitem);
    this.setState({newitem: ''});
  }

  removeItem(i) {
    this.state.items.splice(i, 1);
    this.setState({items: this.state.items});
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
          {this.state.items.map(function(item, idx) {
              return <Item showDone={self.props.showDone} showPending={self.props.showPending} key={item} item={item} onClick={self.removeItem.bind(self, idx)} />;
          })}
        </ul>
      </div>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDone: true,
      showPending: true,
    };
  }

  showAll() {
    this.setState({showDone: true, showPending: true});
  }

  showDone() {
    this.setState({showDone: true, showPending: false});
  }

  showPending() {
    this.setState({showDone: false, showPending: true});
  }

  render() {
    return (
      <div id="app">
        <div><h1>TODO</h1></div>
        <input type="button" value="ALL" onClick={() => this.showAll()} />
        <input type="button" value="DONE" onClick={() => this.showDone()} />
        <input type="button" value="PENDING" onClick={() => this.showPending()} />
        <br/>
        <List showDone={this.state.showDone} showPending={this.state.showPending}></List>
      </div>
    );
  }
}

export default App;
