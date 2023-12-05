import './Modal.scss';
import { AnimatePresence, motion } from 'framer-motion';

/*
	AnimatePresence: 모션을 적용할 컴포넌트의 wrapping 컴포넌트 지정
	- 자식요소의 모션이 끝날때까지 컴포넌트가 언마운트 되는 시점을 holding 처리
	
	motion: 모션을 걸고 싶은 JSX 컴포넌트에 연결해서 initial, animate, exit라는 속성으로 모션 수치값을 조절 가능
	-initial: 모션이 일어나기 전 상태값 / animate: 모션이 일어날 때의 상태값 / exit: 해당 컴포넌트가 사라질 때의 상태값
*/
export default function Modal({ Open, setOpen, children }) {
	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, y: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, y: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%' }}
					transition={{ duration: 0.5 }}
				>
					<div className='con'>{children}</div>
					<span
						onClick={() => {
							setOpen(false);
						}}
					>
						close
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
