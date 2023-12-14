import { combineReducers } from 'redux';

// 순서1. reducer 함수 호출되면서 빈 배열로 멤버 데이터가 저장될 state값을 초기화
// (컴포넌트 마운트 전이기 때문에 빈배열로 초기화해둠)
// 순서2. App.jsx로~
const memberReducer = (state = [], action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer });
export default reducers;
