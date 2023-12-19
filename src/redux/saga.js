import { takeLatest, call, put, fork, all } from 'redux-saga/effects';
import { fetchDepartment, fetchHistory } from './api';
import * as types from './actionType';

//Department Server Data
function* callMembers() {
	yield takeLatest(types.MEMBERS.start, returnMembers);
}
function* returnMembers() {
	try {
		const response = yield call(fetchDepartment);
		yield put({ type: types.MEMBERS.success, payload: response.members });
	} catch (err) {
		yield put({ type: types.MEMBERS.fail, payload: err });
	}
}

//History Server Data
function* callHistory() {
	yield takeLatest(types.HISTORY.start, function* () {
		try {
			const response = yield call(fetchHistory);
			yield put({ type: types.HISTORY.success, payload: response.history });
		} catch (err) {
			yield put({ type: types.HISTORY.fail, payload: err });
		}
	});
}

export default function* rootSaga() {
	yield all([fork(callMembers), fork(callHistory)]);
}
