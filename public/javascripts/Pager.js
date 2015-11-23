var React = require('react');
var ReactDOM = require('react-dom');
var PageList = require('./PageList.js');
var PromoteForm = require('./PromoteForm.js');
var Rebase = require('re-base');
var base = Rebase.createClass('https://fbpager.firebaseio.com');



class Pager extends React.Component {
	constructor () {
		super();
		this.state = {
			id: '',
			name: '',
			mypages: {},
			mypromos: [],
			promotions: {},
			info: '',
			action: 'mypages',
			newPromote: ''
		};
		window.fbAsyncInit = this.fbInit.bind(this);
	}
	fbInit () {
		FB.init({
			appId      : '648885168548067',
			cookie     : true,  // enable cookies to allow the server to access 
																							// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.5' // use version 2.2
		});
		FB.getLoginStatus( this.handleStatusChange.bind(this));
	}
	handleStatusChange (response) {
		console.log('statusChangeCallback');
		console.log(response);

		if (response.status === 'connected') {
				// Logged into your app and Facebook.
		FB.api(
			"/me?fields=id,name,likes{name,created_time,about}",
			response => {
				console.log(response);
				if (response && !response.error) {
					var pages = {};
					response.likes.data.map( function (page) {
						pages[page.id] = {
							name: page.name,
							created_time: page.created_time,
							liked: [response.id],
							about: (page.about)? page.about: ''
						}
					});
					this.setState({
						id: response.id,
						name: response.name,
						mypages: pages
					});
					base.syncState('likes/'+response.id, {
						context: this,
						state: 'mypromos', 
						asArray: true
					});
				}
			}
		);		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			console.log('Please log ' + 'into this app.');
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			console.log('Please log ' + 'into Facebook.');
		}	
	}
	componentDidMount () {
		base.syncState('promotions', {
			context: this,
			state: 'promotions'
		});
	}

	ShowInfo (info) {
		this.setState({info: info});
	}
	ChangeAction (action, id) {
		this.setState({
			action: action,
			newPromote: (id)? id: ''
		});
	}
	NewPromote (data) {
		console.log(data);
		var newP = this.state.promotions;
		if ( !newP[data.id] ) {
			console.log('newwing');
			FB.api(
				"/"+data.id+"?fields=about,name",
				response => {
					console.log('api res')
					console.log(response);
					console.log(newP);
					 base.post('promotions/'+data.id, {
						data: {
							time: data.time,
							likes: [this.state.id],
							about: response.about,
							name: response.name
						}
					});
					this.setState({
						mypromos: this.state.mypromos.concat(data.id)
					 });
				}
			);
		} else {
			if ( newP[data.id].likes.indexOf(this.state.id) < 0 ) {
				base.post('promotions/'+data.id+'/likes', {
						data: this.state.id
				});
			}
		}
	}
	Promote (id) {
		var newP = this.state.promotions;
		if ( !newP[id] ) {
			this.ChangeAction('promote', id);
		} else {
			newP[id].likes.push(this.state.id);
			this.setState({
				promotions: newP,
				mypromos: this.state.mypromos.concat(id)
			});
		}
	}
	Action () {
		switch (this.state.action) {
			case 'promote':
				return ( 
					<PromoteForm newID={this.state.newPromote}
							onChangeAction={this.ChangeAction.bind(this)}
							onNewPromote={this.NewPromote.bind(this)} />
				);
			case 'mypages':
				return (
					<PageList util={this.state.action}
						mypromos={this.state.mypromos}
						data={this.state.mypages}
						onPromote={this.Promote.bind(this)}
						onShowInfo={this.ShowInfo.bind(this)} />
				);
			default:
				return (
					<PageList util={this.state.action}
						mypromos={this.state.mypromos}
						data={this.state.promotions}
						onPromote={this.Promote.bind(this)}
						onShowInfo={this.ShowInfo.bind(this)} />
				);
		}
	}
	render () {
		var action = this.Action();
		return (
			<div>
				<div className="fb-login-button"
					data-max-rows="1"
					data-size="large"
					data-show-faces="false"
					data-auto-logout-link="true" />
				<button onClick={this.ChangeAction.bind(this, 'trend')}>promoting</button>
				<button onClick={this.ChangeAction.bind(this, 'mypages')}>my recent likes</button>
				<button onClick={this.ChangeAction.bind(this, 'promote')}>promote a page</button>
				<div>{this.state.info}</div>
				{action}
			</div>
		);
	}
}



module.exports = Pager;