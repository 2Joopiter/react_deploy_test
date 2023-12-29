import './Visual.scss';
import 'swiper/scss';
import 'swiper/css/pagination';

import { useSelector } from 'react-redux';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Visual() {
	const { youtube } = useSelector(store => store.youtubeReducer);
	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					}
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
*/
