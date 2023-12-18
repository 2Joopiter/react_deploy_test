import { combineReducers } from 'redux';
import * as types from './action'; // 모든 데이터를 한꺼번에 가져와서(*) types라는 이름으로 쓰겠다는 뜻 (as '이름')

const memberReducer = (state = [], action) => {
	switch (action.type) {
		case types.MEMBER.success:
			return { ...state, members: action.payload }; // 여기서 members는 json 안쪽 객체 id값
		default:
			return state;
	}
};

const historyReducer = (state = [], action) => {
	switch (action.type) {
		case types.HISTORY.success: // sucssess일 때
			return { ...state, history: action.payload }; // payload값을 변경
		default:
			return state;
	}
};

const youtubeReducer = (state = [], action) => {
	switch (action.type) {
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = { modal: false }, action) => {
	// state에 들어가는 값은 무조건 객체
	switch (action.type) {
		case types.MODAL.start:
			return { ...state, modal: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer });
export default reducers; // memberReducer의 switch 함수를 combineReducers로 한개의 리듀싱 함수로 묶어서 reducers로 변수정의해서 출력(export)해줌
