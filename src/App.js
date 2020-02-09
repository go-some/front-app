import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import './Home.css';
import './SearchResult.css';

class App extends React.Component {

	constructor(props) {
		super(props);	
		this.state = {
			searchTerm: '',	
		};

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({searchTerm: event.target.value});	
	}

	render() {
		return (
			<Router>
				<div>
					<nav>
						<Link to="/">Home</Link>,
						<Link to="/about">About</Link>
					</nav>

					<Switch>
						<Route path="/about">
							<About />
						</Route>
					
			  		<Route path="/search/:searchTerm" component={SearchResult}/> 
			
						<Route path="/">
							<Home
								searchTerm={this.state.searchTerm}
								onChange={this.handleChange}
							/>
						</Route>
					</Switch>

				</div>
			</Router>
		);
	}
}

class Home extends React.Component {
	constructor(props) {
		super(props);
		this.searchBtnRef = React.createRef();
		this.handleEnter = this.handleEnter.bind(this);
	}

	handleEnter(e) {
		if (e.key == 'Enter') {
			this.searchBtnRef.current.click();
		}	
	}

	render() {
		return (
			<div className="home">
				<div className="search-box">
					<h1>CrOwl</h1>
					<div className="search-input-container">
						<input className="search-input"
							onChange={this.props.onChange}
							onKeyPress={this.handleEnter}
						/>
						<Link
							to={`/search/${this.props.searchTerm}`}
							ref={this.searchBtnRef}
							className="search-btn"
						>
							<FontAwesomeIcon icon={faSearch} />
						</Link>
					</div>
					<div className="etc">
						기타 추천 정보들... <br />
						ex. 유저의 최근 검색 스트림 <br />
						ex. 크라울 내의 앱들 리스팅 <br />
					</div>
				</div>
			</div>
		)
	}
}

class SearchResult extends React.Component {
	constructor(props) {
		super(props);	
		this.state = {
			docs: [
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
				{title: 'test title', body: 'akdsfjaldfjlkadfjladfjl', time: '2020-06-15', url: '' },
			]	
		};
	}

  render() { 
		return (
			<div className="search-result">
				<h2>
					Search Result of <span className="search-term">{this.props.match.params.searchTerm}</span>
				</h2>
				<div className="about">
					검색어 관련 정보들...<br />
					주가 그래프 및 관련 기업 정보 추가...
				</div>
				<div>
					{this.state.docs.map((doc, index) => {
						return (
							<div className="doc-item">
								<img src="http://via.placeholder.com/100x100"/>
								<div className="doc-item-content">
									<div className="doc-item-title">{doc.title}</div>
									<div className="doc-item-body">요약문으로 대체... {doc.body}</div>
									<div className="doc-item-time">{doc.time}</div>
								</div>
							</div>		
						);
					})}
				</div>
			</div>
		);
	}
}

function About() {
	return (
		<div>
			<h2>About</h2>
		</div>
	);
}


export default App;
