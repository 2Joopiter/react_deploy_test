import './Visual.scss';
import 'swiper/css';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';

export default function Visual() {
	const Vids = useSelector(store => store.youtube.data);
	const swiperOpt = useRef({
		modules: [Autoplay],
		autoPlay: { delay: 2000, disableOnInteraction: true },
		spaceBetween: 70,
		loop: true,
		slidesPerView: 1,
		centeredSlides: true,
		breakpoints: {
			1000: { slidePerView: 3 }
		},
		onSwiper: swiper => {
			swiper.slideNext(300);
		}
	});

	return (
		<figure className='Visual'>
			<Swiper {...swiperOpt.current}>
				{Vids.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={data.id}>
							<div className='inner'>
								<div className='picBox'>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</div>
								<div className='txtBox'>
									<h2>{data.snippet.title}</h2>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}
