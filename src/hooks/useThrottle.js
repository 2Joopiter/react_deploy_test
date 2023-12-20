/*
debounce vs throttle
 -debounce: 이벤트가 발생하는 간격시간을 비교해서 일정시간 간격 안에 이벤트가 발생중이면 함수호출을 무기한 연기 (호출의 횟수를 줄이는게 아님) 
  적용 대표 사례: 특정 인풋요소 입력이 끝날때까지 fetching함수 호출 자체를 계속 미룰 때

 -throttle: 물리적으로 반복횟수 자체를 줄이는 것
  적용 대표 사례: window event(scroll, resize) 발생시마다 불필요하게 많이 호출되는 함수의 호출 횟수 자체를 줄임
*/

import { useRef } from 'react';

//setTimeout이 호출되면 delay 뒤에 리턴값 반환이 아니라 호출 즉시 return값을 반환함
//setTimeout의 delay값이 끝나기 전에 중복호출이 되면 기존 함수를 무시하고 다시 초기화해서 setTimeout이 또 호출됨 > 또 반환

export const useThrottle = (func, gap = 500) => {
	// 초기에 null값을 eventBlocker에 담아서 초기 한번은 온전히 setTimeout이 호출되게 처리
	const eventBlocker = useRef(null);

	return () => {
		// eventBlocker값이 담겨있으면 return으로 강제 중지해서 setTimeout의 딜레이 시간 이후에 특정 구문을 중복호출하지 않음
		if (eventBlocker.current) return;

		// setTimeout이 실행됨과 동시에 return값을 eventBlocker에 담아서 중복호출을 막으면서 gap시간 이후에 호출되는 특정로직을 보장
		eventBlocker.current = setTimeout(() => {
			// 일정시간 이후에(Gap 시간 이후) 인수로 전달된 함수를 호출
			func();
			//eventBlocker값을 다시 비움
			eventBlocker.current = null;

			//gap시간 이후에 다시 setTimeout을 호출할 수 있게 됨
		}, gap);
	};
};
