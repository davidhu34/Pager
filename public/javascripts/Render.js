var React = require('react');
var ReactDOM = require('react-dom');
var Pager = require('./Pager.js');
var myUser = '';
var socket = io.connect('http://localhost:3000');
socket.on('connect',function(){
	console.log('CONNECTED');
});

class Render extends React.Component {
	ComponentDidMount () {
	}
	render () {
		return  <Pager />
	}
}


ReactDOM.render(
		<Render />,
		document.getElementById('content')
);

/*$.get('/user', function (data) {
	myUser = data.username;
	console.log(myUser);
	ReactDOM.render(
		<ChatApp />,
		document.getElementById('content')
	);
});*/