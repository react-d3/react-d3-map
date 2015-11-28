"use strict"

var React = require('react');
var ReactDOM = require('react-dom');


(function() {
  var Button = React.createClass({
    contextTypes: {
      color: React.PropTypes.string
    },
    render: function() {
      return (
        <button style={{background: this.context.color}}>
          {this.props.children}
        </button>
      );
    }
  });

  var Message = React.createClass({

    render: function() {
      return (
        <div>
          {this.props.text} <Button>Delete</Button>
        </div>
      );
    }
  });

  var MessageList = React.createClass({
    childContextTypes: {
      color: React.PropTypes.string
    },
    getChildContext: function() {
      return {color: "purple"};
    },
    render: function() {
      var children = this.props.messages.map(function(message, i) {
        return <Message
          text={message.text}
          key={i}
          />;
      });


      return (<div>
        {children}
        {this.props.children}
      </div>);
    }
  });

  var messages = [
    {
      text: '1'
    },
    {
      text: '2'
    },
    {
      text: '3'
    }
  ]


  var Test = React.createClass({
    contextTypes: {
      color: React.PropTypes.string
    },
    render: function() {
      return (
        <button style={{background: this.context.color}}>
          Test btn
        </button>
      );
    }
  });

  ReactDOM.render(
    <MessageList messages= {messages}>
      <Test/>
      <Test/>
    </MessageList>
    , document.getElementById('blank-test')
  )
})()
