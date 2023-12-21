import './Modal.scss';
import { IoClose } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { modalClose } from '../../../redux/modalSlice';

/*
	AnimatePresence: 모션을 적용할 컴포넌트의 wrapping 컴포넌트 지정
	- 자식요소의 모션이 끝날때까지 컴포넌트가 언마운트 되는 시점을 holding 처리
	
	motion: 모션을 걸고 싶은 JSX 컴포넌트에 연결해서 initial, animate, exit라는 속성으로 모션 수치값을 조절 가능
	-initial: 모션이 일어나기 전 상태값 / animate: 모션이 일어날 때의 상태값 / exit: 해당 컴포넌트가 사라질 때의 상태값
*/
export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector(store => store.modalReducer.open);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, y: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, y: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', transition: { delay: 0.5 } }}
					transition={{ duration: 0.8 }}>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 0.8 }}>
						{children}
					</motion.div>
					<span
						onClick={() => {
							dispatch(modalClose());
						}}>
						<IoClose />
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
