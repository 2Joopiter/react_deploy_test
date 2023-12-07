import Layout from '../../common/layout/Layout';
import './Community.scss';
import { MdClose } from 'react-icons/md';
import { IoMdCreate } from 'react-icons/io';
import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return [];
	};
	const [Post, setPost] = useState(getLocalData());
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);

	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요');
		}

		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) }, ...Post]);
		resetPost();
	};

	// 글 수정 함수
	const updatePost = (updateIndex) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과 본문을 모두 입력하세요');
		}
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	const deletePost = (delIndex) => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return; //confirm-alert에 확인기능까지 추가된 팝업창
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	//수정모드 변경 함수
	const enableUpdate = (editIndex) => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	const disableUpdate = (editIndex) => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	const filterText = (txt) => {
		Post.filter((el) => el.title.indexOf(txt) >= 0 || el.content.indexOf(txt) >= 0);
	};

	useEffect(() => {
		// Post 데이터가 변경되면 수정모드를 강제로 false처리하면서 로컬저장소에 저장하고 컴포넌트 재실행
		Post.map((el) => {
			el.enableUpdate = false;
		});
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<div className='wrap'>
				<div className='inputBox'>
					<input type='text' placeholder='title' ref={refTit} />
					<textarea cols='30' rows='6' placeholder='content' ref={refCon}></textarea>
					<nav>
						<button onClick={createPost}>
							<IoMdCreate />
						</button>
						<button onClick={resetPost}>
							<MdClose />
						</button>
					</nav>
				</div>
				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = changeText(date?.split('T')[0].slice(1), '.');
						const strTime = changeText(date?.split('T')[1].slice(0, 5), '.');

						if (el.enableUpdate) {
							// 수정모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<input type='text' defaultValue={el.title} ref={refEditTit} />
										<textarea cols='30' rows='4' defaultValue={el.content} ref={refEditCon}></textarea>
										<span>
											{strDate}/{strTime}
										</span>
									</div>
									<nav>
										<button onClick={() => updatePost(idx)}>Modify</button>
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
									</nav>
								</article>
							);
						} else {
							// 출력모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>
											{strDate}/{strTime}
										</span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button
											onClick={() => {
												deletePost(idx);
											}}
										>
											Delete
										</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
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

/*
- LocalStorage: 모든 브라우저가 내장하고 있는 경량의 저장소
    - 문자값만 저장 가능 (최대 5MB)
    - 로컬 저장소에 문자열 이외의 값을 저장할 때에는 강제로 문자화시켜서 저장해야 함
    - 로컬저장소의 값을 JS로 가져올 때에는 반대로 문자값을 객체화 시켜서 호출해야 함

- LocalStorage 객체에 활용 가능한 메서드
    - setItem(’키값’,’문자화로 저장된 데이터’); 해당 key 값에 데이터를 담아서 저장
    - getItem(’키값’): 해당 key값에 매칭이 되는 데이터를 가져옴
*/

/*
	글 수정 로직 단계
	1. 각 포스트에서 수정 버튼 클릭시 해당 객체에 enableUpdate=true라는 property를 동적으로 추가후 state에 저장
	2. 다음번 렌더링 사이클에서 포스트를 반복돌며 객체에 enableUpdate 값이 true이면 제목 본문을 input요소에 담아서 출력하도록 분기처리 (수정모드로 분기처리해서 출력되도록)
	3. 수정모드일때는 버튼도 수정 취소, 수정 완료로 변경(생성)
	4. 수정모드에서 수정 취소버튼 클릭시 해당 포스트 객체에 enableUpdate=false로 변경해서 다시 출력모드를 변경
	5. 수정모드에서 수정 완료 클릭시 해당 폼 요소에 수정된 value값을 가져와서 저장한 뒤 다시 출력모드 변경
*/
