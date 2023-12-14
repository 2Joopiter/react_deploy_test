import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import Footer from './components/common/footer/Footer';
import Menu from './components/common/menu/Menu';
import Detail from './components/sub/youtube/Detail';

import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMedia } from './hooks/useMedia';

export default function App() {
	// 순서2. dispatch 함수를 활성화시킴; 추후 우리가 담을 데이터가 fecthing된 후에 그 값을 action에 담아서 reducer로 넘겨주기 위함
	const dispatch = useDispatch();
	const [Dark, setDark] = useState();
	const [Toggle, setToggle] = useState(false);
	const path = useRef(process.env.PUBLIC_URL);

	// 순서3. fecthing된 데이터값을 받아서 action 객체에 담은 뒤 dispatch로 reducer에 전달하는 함수를 정의
	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then(data => data.json())
			.then(json => {
				console.log(json.members);
				dispatch({ type: 'SET_MEMBERS', payload: json.members });
			});
	};

	// 순서4. 컴포넌트가 처음 mount 되었을 때 함수를 호출해서 비동기 데이터를 reducer에 전달
	// render1(첫번째 렌더링): 전역 store의 값은 빈 배열
	// render2(두번째 렌더링): 이때 비로소 각 컴포넌트에서 useSelector로 해당 비동기데이터에 접근 가능해짐
	// 순서5는 Footer.jsx로~
	useEffect(() => fetchDepartment(), []);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header Dark={Dark} setDark={setDark} Toggle={Toggle} setToggle={setToggle} />
			<Route exact path='/' component={MainWrap} />
			<Route path='/Community' component={Community} />
			<Route path='/Contact' component={Contact} />
			<Route path='/Department' component={Department} />
			<Route path='/Gallery' component={Gallery} />
			<Route path='/Members' component={Members} />
			<Route path='/Youtube' component={Youtube} />
			<Route path='/Detail/:id' component={Detail} />
			<Footer />
			{Toggle && <Menu setToggle={setToggle} />}
		</div>
	);
}
