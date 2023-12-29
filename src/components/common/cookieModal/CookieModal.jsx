import './CookieModal.scss';

export default function CookieModal({ wid, ht, children }) {
	return (
		<aside
			className='CookieModal'
			style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}>
			<div className='content'>{children}</div>

			<div className='controls'>
				<nav>
					<input type='checkbox' />
					<span>오늘하루 팝업보지 않기</span>
				</nav>

				<span>close</span>
			</div>
		</aside>
	);
}
