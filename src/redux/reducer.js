import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const 

const reducers = combineReducers({ memberReducer });
export default reducers; // memberReducer의 switch 함수를 combineReducers로 한개의 리듀싱 함수로 묶어서 reducers로 변수정의해서 출력(export)해줌
