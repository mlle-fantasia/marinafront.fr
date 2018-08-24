import React, {Component} from 'react';


import App from './App';
import {Route} from 'react-router-dom'
import Provider from './Provider';

import CvPage from "./composants/pageCv/CvPage";
import ContactPage from "./composants/pageContact/ContactPage";
import RealisationsPage from "./composants/pageRealisation/RealisationsPage";
import RealisationArticle from "./composants/pageRealisation/RealisationArticle";
import MentionsLegalesPage from "./composants/MentionsLegalesPage";
import axios from 'axios';

const API = "http://api.marinafront.fr";


class RouteComposant extends Component {

    state = {
        realisations: [],
    };

    componentDidMount() {
        axios.get(API + "/realisation-article.php").then((response) => {
            if (response.data.error) {
                console.log("tu as une erreur");
                return true;
            }
            const realisations = response.data.payloadArticle;
            this.setState({realisations});
        })
    }

    render() {

        const
            LIENS = [
                {route: "/cv", nom: "CV", component: CvPage, exact: true, icon: "CV", link: true},
                {route: "/realisations", nom: "Réalisations", component: RealisationsPage, exact: true, icon: "Realisations", link: true},
                {route: "/realisations/:id", component: RealisationArticle, exact: false, link: false},
                {route: "/contact", nom: "Contact", component: ContactPage, exact: true, icon: "Contact", link: true},
                {route: "/mentions-legales", nom: "mentions-legales", component: MentionsLegalesPage, exact: true,  link: false}
            ];

        let liensNavigation = LIENS.filter(function (element) {
                return element.link ? element : false;
            });


        const
            listeLiensRouter = LIENS.map((element, i) => (
                <Route key={i} path={element.route} exact={element.exact} component={element.component}/>
            ));

        return (
            <Provider tabRea={this.state.realisations}>
                <App tabLiens={liensNavigation} tabRoute={listeLiensRouter}/>
            </Provider>

        );
    }

}


export default RouteComposant;
