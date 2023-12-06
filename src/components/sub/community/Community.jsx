import Layout from '../../common/layout/Layout';
import './Community.scss';
import { MdClose } from 'react-icons/md';
import { IoMdCreate } from 'react-icons/io';

export default function Community() {
	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<form>
						<input type='text' placeholder='title' name='tit' />
						<textarea name='con' cols='30' rows='10' placeholder='content'></textarea>
						<nav>
							<button>
								<IoMdCreate />
							</button>
							<button>
								<MdClose />
							</button>
						</nav>
					</form>
				</div>
				<div className='showBox'></div>
			</div>
		</Layout>
	);
}

/*
	<작업 과정>
	1. input박스(글 입력 박스), 글 출력박스를 생성
	2. 전체 글을 관리할 배열 state를 생성 [{글정보1}}, {글정보2}, {글정보3}] 같은 느낌으로
	3. 글 입력박스에 글 입력 후 저장 버튼 클릭시 그 정보를 객체형태로 state에 계속 추가 (Create 기능)
	4. state 배열에 추가된 값들을 반복돌면서 글 리스트 출력 (Read)
	5. 글 출력시 삭제, 수정버튼 추가해서 출력
	6. 글 리스트에서 삭제버튼 클릭시 해당 배열의 state에서 이벤트가 발생한 순번의 객체를 제거해서 글 삭제(Delete 기능)

	C (Create/데이터 저장) 예> 글 작성
	R (Read/데이터 호출)   예> 글 목록보기
	U (Update/데이터 변경) 예> 글 수정
	D (Delete/데이터 삭제) 예> 글 삭제

*/
