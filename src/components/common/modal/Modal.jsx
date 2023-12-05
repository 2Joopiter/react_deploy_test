import './Modal.scss';

//모달 컴포넌트 자체적으로 특정 state값에 따라서 자기 자신의 컨텐츠를 보여줄지 말지를 결정
//부모 컴포넌트 기준에서 Modal 컴포넌트는 계속 마운트 되어 있는 상태이지만, State 값에 따라서 DOM 출력/미출력만 변경됨
export default function Modal({ Open, setOpen, children }) {
	return (
		<>
			{Open && (
				<aside className='Modal'>
					<div className='con'>{children}</div>
					<span
						onClick={() => {
							setOpen(false);
						}}
					>
						close
					</span>
				</aside>
			)}
		</>
	);
}
