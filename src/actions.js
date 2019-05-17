import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants';

export const setSearchField = (text) => ({
	type: CHANGE_SEARCH_FIELD,
	payload: text
});

// If you'd like to console.log it, then do it in this way:
// export const setSearchField = (text) => {
// 	console.log(text);
// 	return {
// 		type: CHANGE_SEARCHFIELD,
// 		payload: text
// 	};
// };

// "requestRobots()" right now out of the box, wouldn't understand this. Because we're now, not returning an object as it expected. WE're returning a function(the 2nd func from (dispatch)). And this function (from dispatch) isn't going to mean anything to it. By adding "redux thunkMiddleware", we're now listening to actions. And anytime the "requestRobots" action gets triggered, it's going to return a function and trigger 'redux-thunk'. And 'redux-thunk' is going to say,"Oooo, this is a function. I'm gonna give you here the (dispatch), so you can actually call some actions". And we can finally...
export const requestRobots = () => (dispatch) => {
	// And we can finally run our actions like this:
	dispatch({ type: REQUEST_ROBOTS_PENDING });
	fetch('https://jsonplaceholder.typicode.com/users')
		// Here, dispatch work with this second layer:
		.then((response) => response.json())
		.then((users) => dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: users }))
		.catch((err) => dispatch({ type: REQUEST_ROBOTS_FAILED, payload: err }));
};
