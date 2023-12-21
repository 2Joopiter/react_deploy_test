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
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchYoutube } from './redux/youtubeSlice';
import { fetchMember } from './redux/memberSlice';
import { fetchHistory } from './redux/historySlice';
import { fetchFlickr } from './redux/flickrSlice';

import { Route } from 'react-router-dom';
import { useMedia } from './hooks/useMedia';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';

export default function App() {
	const dispatch = useDispatch();
	const Dark = useSelector(store => store.dark.isDark);

	useEffect(() => {
		dispatch(fetchYoutube());
		dispatch(fetchMember());
		dispatch(fetchHistory());
		dispatch(fetchFlickr({ type: 'user', id: '199646606@N06' }));
	}, [dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route exact path='/' component={MainWrap} />
			<Route path='/Community' component={Community} />
			<Route path='/Contact' component={Contact} />
			<Route path='/Department' component={Department} />
			<Route path='/Gallery' component={Gallery} />
			<Route path='/Members' component={Members} />
			<Route path='/Youtube' component={Youtube} />
			<Route path='/Detail/:id' component={Detail} />
			<Footer />
			<Menu />
		</div>
	);
}

/*
	리덕스 비동기데이터의 효율적 처리를 위한 대표적인 미들웨어 2가지
	redux-saga
	--action객체의 변화를 감시하면서 적절한 상태 변화 시점에 액션객체를 생성해서 리듀서를 전달하는 미들웨어 (generator)

	redux-thunk
	--함수자체를 리듀서에 전달하게 해주는 미들웨어. 해당함수가 자동으로 액션객체를 반환하도록 처리


	redux-toolkit이라는 thunk기반의 통합 전역관리 패키지가 나오게 된 개념
	-초반에는 액션객체를 중앙집중적으로 관리하면서 리듀서에 전달하는 방식이 thunk 방식에 비해서 기존 redux 사용 개발자들에게 더 친숙했음 > saga를 많이 쓰게 됨
	-saga방식을 사용하다보니 관리할 파일의 갯수가 많아지고 + 코드의 관리가 어려워짐
	-데이터 카테고리별로 전역관리할 비동기데이터를 분리할 필요가 생김
	-이 시점에 불편했던 thunk 방식의 코드를 개선한 redux-toolkit이라는 통합 라이브러리 등장

	redux-toolkit의 장점
	-데이터별로 전역상태관리 파일을 분리할 수 있음
	-사용자가 직접 데이터 상태별로 actionType을 만들 필요가 없이 자동 생성됨
	-하나의 slice 파일 안에 api함수와 reducer를 간결한 문법으로 같이 관리 가능
	
*/
