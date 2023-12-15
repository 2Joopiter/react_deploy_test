import { combineReducers } from 'redux';

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload }; // 여기서 members는 json 안쪽 객체 id값
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer });
export default reducers; // memberReducer의 switch 함수를 combineReducers로 한개의 리듀싱 함수로 묶어서 reducers로 변수정의해서 출력(export)해줌
