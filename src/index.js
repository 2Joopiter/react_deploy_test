import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);



/*
	redux
	-store, reducer, action이 필요
	-store: 어떤 컴포넌트에서든 자유롭게 데이터를 공유할 수 있도록 컴포넌트 외부에 존재하는 독립적인 전역 데이터 공간
	-reducer: store에 변경될 데이터를 전달해주는 변형자함수(Action객체를 받아야지만 store에 변경요청 가능)
	-action: 컴포넌트가 reducer에 데이터 변경요청을 의뢰할 때 필요한 특별한 형태의 객체 {type: '타입', payloda:'데이터'}
	

	// React 문법에서도 redux를 쓸 수 있게끔 해주는 역할
	-dispatch: 컴포넌트에서 action 객체를 전달할 때는 무조건 dispatch를 통해서만 전달할 수 있음
	-selector: 컴포넌트에서 전역 store에 데이터를 요청할 땐 무조건 selector를 통해서만 호출 가능
*/