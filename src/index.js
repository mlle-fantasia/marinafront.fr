import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouteComposant from './RouteComposant';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(<RouteComposant/>, document.getElementById('root'));
registerServiceWorker();
