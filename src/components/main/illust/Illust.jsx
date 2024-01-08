import './Illust.scss';
import { useScroll } from '../../../hooks/useScroll';
import { useRef } from 'react';

export default function Illust() {
	const pathEl = useRef(null);

	const handleCustomScroll = scroll => {
		const pathLen = 2080;

		if (scroll < 0) {
			pathEl.current.style.strokeDashoffset = pathLen;
		}

		if (scroll >= 0) {
			let resultScroll = 0;
			pathLen - scroll * 4 < 0 ? (resultScroll = 0) : (resultScroll = pathLen - scroll * 4);
			pathEl.current.style.strokeDashoffset = resultScroll;
		}
		if (scroll >= scroll + refEl.current.offsetHeight) {
			pathEl.current.style.strokeDashoffset = 0;
		}
	};

	const { refEl } = useScroll(handleCustomScroll);

	return (
		<div className='Illust myScroll' ref={refEl}>
			<div className='svgBox'>
				{/* viewBox(가로위치값, 세로위치값, 가로폭의 비율, 세로폭의 비율) 0 0 576 512 */}
				<svg viewBox='-1 -1 578 514'>
					<path
						ref={pathEl}
						d='M320 192h17.1c22.1 38.3 63.5 64 110.9 64c11 0 21.8-1.4 32-4v4 32V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V339.2L280 448h56c17.7 0 32 14.3 32 32s-14.3 32-32 32H192c-53 0-96-43-96-96V192.5c0-16.1-12-29.8-28-31.8l-7.9-1c-17.5-2.2-30-18.2-27.8-35.7s18.2-30 35.7-27.8l7.9 1c48 6 84.1 46.8 84.1 95.3v85.3c34.4-51.7 93.2-85.8 160-85.8zm160 26.5v0c-10 3.5-20.8 5.5-32 5.5c-28.4 0-54-12.4-71.6-32h0c-3.7-4.1-7-8.5-9.9-13.2C357.3 164 352 146.6 352 128v0V32 12 10.7C352 4.8 356.7 .1 362.6 0h.2c3.3 0 6.4 1.6 8.4 4.2l0 .1L384 21.3l27.2 36.3L416 64h64l4.8-6.4L512 21.3 524.8 4.3l0-.1c2-2.6 5.1-4.2 8.4-4.2h.2C539.3 .1 544 4.8 544 10.7V12 32v96c0 17.3-4.6 33.6-12.6 47.6c-11.3 19.8-29.6 35.2-51.4 42.9zM432 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm48 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32z'
					/>
				</svg>
			</div>
		</div>
	);
}
