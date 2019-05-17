import {
	CHANGE_SEARCH_FIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants';

const initialStateSearch = {
	searchField: ''
};

export const searchRobots = (state = initialStateSearch, action = {}) => {
	// console.log(action.type);

	switch (action.type) {
		case CHANGE_SEARCH_FIELD:
			// return Object.assign({}, state, { searchField: action.payload }); // first objects(curly brackets); then the 'state' that we're receiving which is the initial state this time; and then finally whatever we want to change. And the third parameter is always gonna be an object. Here, we're interested to change the searchfield property.
			// OR write it in short:
			return { ...state, searchField: action.payload };
		default:
			return state;
	}
};

const initialStateRobots = {
	isPending: false,
	robots: [],
	err: ''
};

export const requestRobots = (state = initialStateRobots, action = {}) => {
	switch (action.type) {
		case REQUEST_ROBOTS_PENDING:
			return { ...state, isPending: true };
		case REQUEST_ROBOTS_SUCCESS:
			return { ...state, robots: action.payload, isPending: false };
		case REQUEST_ROBOTS_FAILED:
			return Object.assign({}, state, { err: action.payload, isPending: false });
		default:
			return state;
	}
};
