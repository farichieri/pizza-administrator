import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/actions';

export default async function useAdmin() {
  const dispatch = useDispatch();
  const userStorage = localStorage.getItem('user');
  const user = JSON.parse(userStorage);
  dispatch({ type: 'LOGIN', payload: user });

  return user.isAdmin;
}
