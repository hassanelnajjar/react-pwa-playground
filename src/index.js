import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as sw from './serviceWorkerRegistration';

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);

sw.register();
