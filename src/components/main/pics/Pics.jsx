import { useRef } from 'react';
import { useScroll } from '../../../hooks/useScroll';
import './Pics.scss';
export default function Pics() {
	console.log('Pics');
	const titEl = useRef(null);
	const titEl2 = useRef(null);

	const customHandleScroll = scroll => {
		titEl.current.style.transform = `translateX(${scroll}px)`;
		titEl.current.style.opacity = 1 - scroll / 550;
		titEl2.current.style.transform = `scale(${1 + scroll / 400}) translateX(${scroll * 0.8}px)`;
		titEl2.current.style.opacity = 1 - scroll / 1000;
	};

	const { refEl } = useScroll(customHandleScroll);

	return (
		<section className='Pics myScroll' ref={refEl}>
			<h3 className='tit' ref={titEl}>
				FLICKR
			</h3>
			<h4 className='tit2' ref={titEl2}>
				PREVIEW
			</h4>
		</section>
	);
}
