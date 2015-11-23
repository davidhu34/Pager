var React = require('react');
var ReactDOM = require('react-dom');

class PromoteForm extends React.Component {
  	handleNewPromote () {
  		var data = {
  			id:ReactDOM.findDOMNode(this.refs.id).value,
  			time: ReactDOM.findDOMNode(this.refs.date).value
  		};
  		this.props.onNewPromote(data);
  	}
	render () {
		return (
			<div>
				Page ID:
				<input type="text"
					ref="id"
					defaultValue={(this.props.newID)? this.props.newID: ''} /><br/>
				Activity Time:
				<input type="date"
					ref="date" /><br/>
				<button onClick={this.handleNewPromote.bind(this)}>promote</button>
				<button onClick={this.props.onChangeAction.bind(this, 'mypages')}>cancel</button>
			</div>
		);
	}
}

module.exports = PromoteForm;