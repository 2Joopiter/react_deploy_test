import { combineReducers } from 'redux';


/*  dispatch가 필요한 이유 및 흐름
  // 지금같은 구조는 실무에서 쓰이기 힘듬
  원래 데이터는 자체DB이건 외부 API 데이터이건 어쨌든 fetching을 통해서 외부 데이터를 가져와야 함
  그래서 위와같이 reducer 안쪽에 초기데이터를 설정하는 것이 불가능

  // dispatch로 외부 데이터를 fetching 후 전역 state에 담는 순서
  1. 컴포넌트에서 useEffect로 mount시 fetching함수 호출 후 데이터 반환
  2. 해당 데이터를 지역state에 담는 것이 아닌 action 객체의 payload에 담아서 dispatch로 리듀서에 전달
  3. 리듀서 함수 로직에 의해 fatching한 데이터가 store에 전달되고 
  4. 이후 각 컴포넌트에서 useSelector로 해당 데이터에 자유롭게 접근 가능해짐
*/ 

// 초기 데이터값을 state로 지정하고 추후 action 객체가 넘어오면 action의 타입에 따라 해당 데이터를 변경해주는 변형자 함수를 생성
// {type:'SET_MEMBERS' : payloda:{변경할데이터배열}}
// {type: 'ANYTHING' : payloda:err} // 변경 안됨ㅁㅁㅁ

const memberReducer = (state = [], action) => {
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
