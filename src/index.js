import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Route} from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import CvPage from "./composants/pageCv/CvPage";
import ContactPage from "./composants/pageContact/ContactPage";
import RealisationsPage from "./composants/pageRealisation/RealisationsPage";
import RealisationArticle from "./composants/pageRealisation/RealisationArticle";


const LIENS = [
    {route: "/cv", nom: "CV", component: CvPage, exact: true, icon: "CV", link: true},
    {route: "/realisations", nom: "Réalisations", component: RealisationsPage, exact: true, icon: "Realisations", link: true},
    {route: "/realisations/:id", component: RealisationArticle, exact: false, link: false},
    {route: "/contact", nom: "Contact", component: ContactPage, exact: true, icon: "Contact", link: true}
];

let liensNavigation = LIENS.filter(function (element) {
    return element.link ? element : false;
});


const listeLiensRouter = LIENS.map((element) => (
    <Route path={element.route} exact={element.exact} component={element.component}/>
));


ReactDOM.render(<App tabLiens={liensNavigation} tabRoute={listeLiensRouter} />, document.getElementById('root'));
registerServiceWorker();
