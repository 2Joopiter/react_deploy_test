import Banner from '../banner/Banner';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import Btns from '../btns/Btns';
import './MainWrap.scss';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Banner />
			{/* <Btns frame={스크롤 제어할 프레임요소 클래스명} items={스크롤이 걸릴 영역 공통클래스} base={활성화 기준점} isAuto={오토스크롤 유무(boolean : default-false)} */}
			<Btns />
		</div>
	);
}
