import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//rooter
import {BrowserRouter, Match, Miss} from 'react-router-dom';
import App from './App';
import NotFound from './composants/NotFound';
import registerServiceWorker from './registerServiceWorker';

const Root = () =>{
    return(
        <BrowserRouter>
            <div>
                <Match exacty pattern="/" component={App}/>

                <Miss component={NotFound}/>
            </div>
        </BrowserRouter>
    )
}



ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
