import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';

import { useSelector } from 'react-redux';
import { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useEffect } from 'react';

function Btns() {
	// swiper 컴포넌트 안쪽에 있는 또다른 자식 컴포넌트 안쪽에서만 useSwiper hook 사용 가능
	// 훅으로부터 생성된 객체(인스턴스) 에서는 다양한 prototype메서드와 property값 활용 가능
	const swiper = useSwiper();
	useEffect(() => {
		swiper.slideNext(300);
	}, [swiper]);
	return (
		<nav className='swiperController'>
			<button
				onClick={() => {
					// 다시 롤링 시작버튼 클릭시 delay없이 바로 슬라이드를 넘기고 다시 롤링 시작
					swiper.slideNext(300);
					swiper.autoplay.start();
				}}>
				Start
			</button>
			<button onClick={() => swiper.autoplay.stop()}>Stop</button>
		</nav>
	);
}

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
				}}
				autoplay={{
					delay: 5000,
					disableOnInteraction: true
				}}
				loop={true}>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<h3>{vid.snippet.title}</h3>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns />
			</Swiper>
		</figure>
	);
}

/*
 옵션값 설명
 + slidesPerView: 한 화면에 몇개의 항목이 보이게 할 것인지. ex)2 = 한 화면에 2개 보임
 + spaceBetween: 한 화면에 여러개의 항목이 보일 때 그 사이 간격값
 + loop: 순환의 유무. true면 순환
 + Pagination: 아래에 페이지버튼 
 + autoplay: 자동으로 일정시간 후 페이지 넘어가게
*/
