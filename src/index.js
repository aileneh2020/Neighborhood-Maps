import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

// Check for Google authentication errors
window.gm_authFailure = () => {
	ReactDOM.render(
		<h2>Network Error: Unable to load Google Map. Try again later.</h2>,
		window.document.getElementById('root')
	)
}

ReactDOM.render(
	<App />, document.getElementById('root')
)

serviceWorker.register();
