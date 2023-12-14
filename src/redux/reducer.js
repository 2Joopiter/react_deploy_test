import { combineReducers } from 'redux';

const initMember = {
	members: [
		{
			name: 'David',
			position: 'President',
			pic: 'member1.jpg'
		},
		{
			name: 'Julia',
			position: 'Vice President',
			pic: 'member2.jpg'
		},
		{
			name: 'Emily',
			position: 'UI Designer',
			pic: 'member3.jpg'
		},
		{
			name: 'Michael',
			position: 'Front-end Developer',
			pic: 'member4.jpg'
		},
		{
			name: 'Emma',
			position: 'Back-end Developer',
			pic: 'member5.jpg'
		},
		{
			name: 'Peter',
			position: 'Project Manager',
			pic: 'member6.jpg'
		}
	]
};

// 초기 데이터값을 state로 지정하고 추후 action 객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는 변형자 함수를 생성
// {type:'SET_MEMBERS' : payloda:{변경할데이터배열}}
// {type: 'ANYTHING' : payloda:err} // 변경 안됨ㅁㅁㅁ

/* 아래처럼 해도 실행이 되나, 개발자들이 switch문을 많이 이용하므로 switch 식으로 변경
const memberReducer = (state = initMember, action) => {
	if (action.type === 'SET_MEMBERS') {
		return { ...state, members: action.payload };
	} else {
		return state;
	}
};
*/

const memberReducer = (state = initMember, action) => {
	switch (
		action.type // 어떤 조건으로 분기처리 할건지
	) {
		case 'SET_MEMBERS': // case가 SETMEMBERS이면
			return { ...state, members: action.payload }; // 이걸 처리
		default: // else와 같음. 저 case가 아닌 다른 모든 케이스의 경우에는
			return state; // state를 출력
	}
};

// 해당 파일에서 내보내는 여러개의 리듀서객체를 합쳐서 외부로 export
const reducers = combineReducers({ memberReducer });
export default reducers;
