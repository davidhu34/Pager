var React = require('react');
var ReactDOM = require('react-dom');
var Pager = require('./Pager.js');

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