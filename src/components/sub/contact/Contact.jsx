import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	const [Index, setIndex] = useState(0); // 버튼 클릭할때마다 화면이 재렌더링되어 순번에 맞게 재출력
	const [Traffic, setTraffic] = useState(false); // 값을 반전시키면서 보이고 안 보이게 처리
	const [View, setView] = useState(false); // 컴포넌트가 재렌더링되어 로드뷰화면/맵화면 전환 처리

	const kakao = useRef(window.kakao); // 카카오 객체를 가져옴(index.html에 연결해둔 것)
	const marker = useRef(null);
	const mapInstance = useRef(null);
	const viewFrame = useRef(null);

	const mapFrame = useRef(null);
	const mapInfo = useRef([
		{
			title: '여의도 IFC몰',
			latlng: new kakao.current.maps.LatLng(37.52506188634506, 126.9259552665427),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '삼성역 코엑스',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		},
		{
			title: '서울 시청',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) }
		}
	]); // 객체로 값을 담음

	// 마커 인스턴스 생성
	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOpt
		)
	});

	// 로드뷰 함수
	const roadView = () => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(
			mapInfo.current[Index].latlng,
			100,
			panoId => {
				new kakao.current.maps.Roadview(viewFrame.current).setPanoId(
					panoId,
					mapInfo.current[Index].latlng
				);
			}
		);
	};

	// 지도위치 갱신시키는 함수
	const setCenter = () => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
		roadView();
	};

	// 컴포넌트 마운트시 참조객체에 담아놓은 돔 프레임에 지도 인스턴트 출력 및 마커 생성
	// 일일이 제어해야 하는 값을 state 정보값으로 한번에 제어 가능해짐
	useEffect(() => {
		mapFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		roadView();

		// 지도타입 컨트롤러 추가
		mapInstance.current.addControl(
			new kakao.current.maps.MapTypeControl(),
			kakao.current.maps.ControlPosition.TOPRIGHT
		);
		// 지도 줌 컨트롤러 추가
		mapInstance.current.addControl(
			new kakao.current.maps.ZoomControl(),
			kakao.current.maps.ControlPosition.RIGHT
		);
		// 휠로 맵 줌 기능 비활성화
		mapInstance.current.setZoomable(false); // 마우스 휠로 맵 줌/아웃 기능 비활성화(true로 바꾸면 다시 활성화)

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	return (
		<Layout title={'Contact'}>
			<div className='controlBox'>
				<nav className='branch'>
					{mapInfo.current.map((el, idx) =>
						//prettier-ignore
						<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
							{el.title}
						</button>
					)}
				</nav>
				<nav className='info'>
					{' '}
					{/* 함수 거의 없고 state 값에 따른 제어 */}
					<button
						onClick={() => {
							setTraffic(!Traffic);
						}}>
						{Traffic ? 'Traffic OFF' : 'Traffic ON'}
					</button>
					<button onClick={() => setView(!View)}>{View ? 'map' : 'road view'}</button>
					<button onClick={setCenter}>위치 초기화</button>
				</nav>
			</div>
			<section className='tab'>
				<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
				<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
			</section>
		</Layout>
	);
}

/* 
	1. cdn 불러온 window에 불러온 외부객체값을 가져와서 인스턴스 생성
	2. 인스턴스값을 참조객체에 담는 이유 (의존성 배열에 불필요하게 등록하지 않기 위해서)
	3. 화면 변경점이 발생해야 될 때 무조건 State 값에 따라서 변경되게 로직화 한 다음에 이벤트 발생시 State를 변경해서 화면 재랜더링 유도
*/
