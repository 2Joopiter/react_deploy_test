import './MainWrap.scss';
import Banner from '../banner/Banner';
import Info from '../info/Info';
import Pics from '../pics/Pics';
import Visual from '../visual/Visual';
import Btns from '../btns/Btns';
import Illust from '../illust/Illust';

export default function MainWrap() {
	return (
		<div className='MainWrap'>
			<Visual />
			<Info />
			<Pics />
			<Illust />
			<Banner />
			<Btns />
		</div>
	);
}
