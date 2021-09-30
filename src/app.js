//Loading styles
import { loginListeners } from './js/login';
// import { registerListeners } from './js/registerForm';
import './styles/app.scss';

const main = () => {
	// registerListeners();
	loginListeners();
};

main();