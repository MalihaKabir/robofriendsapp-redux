import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import { setSearchField, requestRobots } from '../actions';

// 1st part: Every state is going to be updated here(in 'mapStateToProps').
const mapStateToProps = (state) => {
	return {
		// searchField: state.searchField,
		// As you combine the reducers in 'index.js', 'state' has no longer "searchField" as it's part of property. Instead, it has 'searchRobots' and 'requestRobots' as it's property(in index.js). And now, here, 'searchRobots' has "searchField" as it's prop or property. Hence, now "searchField:" will be...
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots, // 'requestRobots.robots' is from reducers.js
		isPending: state.requestRobots.isPending,
		err: state.requestRobots.err
	};
	// console.log(state);
};

// this is the 2nd and most important part which is "onRequestRobots:" action, something that replace "componentDidMount()" request.
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),

		// Here, we don't want to just dispatch, rather we want to return a function from it. In our case, it's "requestRobots()" reducer.
		// onRequestRobots: () => requestRobots(dispatch) // And it has a dispatch method.
		// This is the same as doing this:
		onRequestRobots: () => dispatch(requestRobots()) // because in 'action.js' we're using "dispatch" as a second layer function.
	};
};

class App extends Component {
	// We don't need the constructor anymore because these robots are going to return as part of the props from "onRequestRobots()".
	// constructor() {
	// 	super();
	// 	this.state = {
	// 		robots: []
	// 	};
	// }

	componentDidMount() {
		// console.log(this.props.store.getState());
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then((response) => response.json())
		// 	.then((users) => this.setState({ robots: users }));

		// Now we don't need to fetch here. All we need to do is:
		this.props.onRequestRobots();

		// And we also don't need the above constructor anymore. So, delete it.
	}

	render() {
		// const { robots } = this.state;
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter((robot) => {
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		});
		return isPending ? (
			<h1 className="tc f2">Loading...</h1>
		) : (
			<div className="tc pt4">
				<h1 className="f1">RoboFriends</h1>
				<SearchBox searchChange={onSearchChange} />
				<Scroll>
					<CardList robots={filteredRobots} />
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
