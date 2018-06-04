import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import CvPage from "./composants/pageCv/CvPage";
import ContactPage from "./composants/pageContact/ContactPage";
import RealisationsPage from "./composants/pageRealisation/RealisationsPage";

const LIENS = [
    {route: "/cv", nom: "CV", component: CvPage, exact: false, icon: "CV"},
    {route: "/realisations", nom: "Réalisation", component: RealisationsPage, exact: false, icon: "Realisations"},
    {route: "/contact", nom: "Contact", component: ContactPage, exact: false, icon: "Contact"}
];

const listeLiensRouter = LIENS.map((element) => (
    <Route path={element.route} exact={element.exact} component={element.component}/>
));

ReactDOM.render(<App tabLiens={LIENS} tabRoute={listeLiensRouter}/>, document.getElementById('root'));
registerServiceWorker();
