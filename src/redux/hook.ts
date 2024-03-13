//일반적인 useDipatch와 useSelector의 typed version을 export
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store';

//useSelector를 직접 사용하는 경우, 매번 (state:RootState)를 붙여줘야 하므로 변환
//useDispatch를 직접 사용하는 경우, thunks를 인식하지 못하는 문제 해결
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;