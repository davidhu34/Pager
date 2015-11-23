var React = require('react');
var ReactDOM = require('react-dom');

class PageItem extends React.Component {
	componentDidMount () {
	}
	getButton () {
		if ( this.props.liked ) {
			return (<div className="u-pull-right" />);
		} else {
			if ( this.props.util === 'mypages' )
				return (
					<button className="u-pull-right"
						onClick={this.props.onPromote.bind(this, this.props.url.substring(25) )} >
					promote</button>
				);
		}

	}
	render () {
		var name = this.props.data.name;
		var url = this.props.url;
		var Button = this.getButton();
		return (
			<li onMouseEnter={this.props.onShowInfo.bind(this, this.props.data.about)}>
				{Button}
				<div className="fb-page"
					data-href={url}
					data-small-header={false}
					data-adapt-container-width={true}
					data-hide-cover={false}
					data-show-facepile={true}
					data-show-posts={false}>
					<div className="fb-xfbml-parse-ignore">
						<blockquote cite={url}>
							<a href={url}>{name}</a>
						</blockquote>
					</div>
				</div>
			</li>
		);
	}
}

module.exports = PageItem;