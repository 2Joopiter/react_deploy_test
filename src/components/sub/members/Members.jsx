import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useRef, useState } from 'react';

export default function Members() {
	const initVal = useRef({
		userid: '',
		email: '',
		comments: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: []
	});
	const [Val, setVal] = useState(initVal.current);

	const handleChange = e => {
		//const key = e.target.name; // userid
		//const value = e.target.value; // 현재 입력하고 있는 인풋값
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = e => {
		const { name } = e.target;
		const inputs = e.target.parentElement.querySelectorAll('input');
		const checkArr = [];
		inputs.forEach(input => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email */}
									<tr>
										<td>
											<input
												type='text'
												name='userid'
												value={Val.userid}
												placeholder='User ID'
												onChange={handleChange}
											/>
										</td>
										<td>
											<input
												type='text'
												name='email'
												value={Val.email}
												onChange={handleChange}
												placeholder='Email'
											/>
										</td>
									</tr>

									{/* pwd1, pwd2 */}
									<tr>
										<td>
											<input
												type='password'
												name='pwd1'
												placeholder='Password'
												value={Val.pwd1}
												onChange={handleChange}
											/>
										</td>
										<td>
											<input
												type='password'
												name='pwd2'
												placeholder='Re-Password'
												value={Val.pwd2}
												onChange={handleChange}
											/>
										</td>
									</tr>

									{/* edu */}
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
										</td>
									</tr>

									{/* gender */}
									<tr>
										<td colSpan='2'>
											<input
												type='radio'
												defaultValue='female'
												id='female'
												name='gender'
												onChange={handleChange}
											/>
											<label htmlFor='female'>Female</label>

											<input
												type='radio'
												defaultValue='male'
												id='male'
												name='gender'
												onChange={handleChange}
											/>
											<label htmlFor='male'>Male</label>
										</td>
									</tr>

									{/* interests */}
									<tr>
										<td colSpan='2'>
											<input
												type='checkbox'
												name='interest'
												id='sports'
												defaultValue='sports'
												onChange={handleCheck}
											/>
											<label htmlFor='sports'>Sports</label>
											<input
												type='checkbox'
												name='interest'
												id='reading'
												defaultValue='reading'
												onChange={handleCheck}
											/>
											<label htmlFor='reading'>Reading</label>
											<input
												type='checkbox'
												name='interest'
												id='music'
												defaultValue='music'
												onChange={handleCheck}
											/>
											<label htmlFor='music'>Music</label>
											<input
												type='checkbox'
												name='interest'
												id='game'
												defaultValue='game'
												onChange={handleCheck}
											/>
											<label htmlFor='game'>Game</label>
										</td>
									</tr>

									{/* comments  */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}></textarea>
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출자체를 일정횟수로 줄임
	debounce : 특정 이벤트가 단시간에 반복으로 계속 발생하고 있으면 핸들러함수 호출 자체를 계속 뒤로 밀면서 호출 막음
*/

/*
	리액트에서의 폼 인증 구현 로직 순서
	1. 폼요소에 입력하는 값을 이벤트 핸들러 함수를 통해 실시간으로 state에 저장
	2. state값이 변경될때마다 check 함수를 통해 항목별로 인증 실패시 에러 객체로 묶어서 변환
	3. 폼에 submitHandler 함수를 연결
	4. 전송이벤트가 발생시 submitHandler함수 안쪽에서 check 함수를 호출해서 err 객체가 있으면 인증 실패
	5. check함수가 내보내는 err객체가 없으면 인증 성공 처리
*/
