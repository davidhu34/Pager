var React = require('react');
var ReactDOM = require('react-dom');
var PageItem = require('./PageItem.js');

class PageList extends React.Component {

	render () {
		var util = this.props.util;
		var data = this.props.data;
		var ids = [];
		for ( var id in data )
			ids.push(id);
		ids.sort( function (a, b) {
			if ( util === 'mypages' ) {
				var at = new Date(data[a].created_time);
				var bt = new Date(data[b].created_time);
				return ( at.getTime() < bt.getTime() )? 1: 0;
			} else if ( util === 'trend' ) {
				var al = data[a].likes.length;
				var bl = data[b].likes.length;
				return ( al < bl )? 1: 0;
			}
		});
		var pages = [];
		ids.map( function (id, idx) {
			var url = 'https://www.facebook.com/' + id;
			var Lbool = ( this.props.mypromos.indexOf(id) >= 0 );
			pages.push(
				<PageItem key={idx}
					data={data[id]}
					util={util}
					url={url}
					liked={Lbool}
					onPromote={this.props.onPromote.bind(this)}
					onShowInfo={this.props.onShowInfo.bind(this)} />
			);
		}, this);
		return (
			<ul>{pages}</ul>
		);
	}
}

module.exports = PageList;