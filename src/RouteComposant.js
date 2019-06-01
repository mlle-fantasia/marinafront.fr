import React, {Component} from 'react';


import App from './App';
import {Route} from 'react-router-dom'
import Provider from './Provider';

import CvPage from "./composants/pageCv/CvPage";
import ContactPage from "./composants/pageContact/ContactPage";
import RealisationsPage from "./composants/pageRealisation/RealisationsPage";
import RealisationArticle from "./composants/pageRealisation/RealisationArticle";
import MentionsLegalesPage from "./composants/MentionsLegalesPage";
import PagePendus from "./composants/pageRealisation/PagePendus";
import axios from 'axios';


//const API = "https://api.marinafront.fr"; //prod
//const API = "http://api-site-web"; //local


class RouteComposant extends Component {

    state = {
        realisations: [],
        projets: [],
        api:"http://api-site-web",
    };

    async componentDidMount()  {

         const [firstResponse, secondResponse] = await Promise.all([
             axios.get(this.state.api + "/realisation-article.php"),
             axios.get(this.state.api + "/realisation-oc.php")
         ]);

        if (firstResponse.data.error) {
            console.log("tu as une erreur dans la récupération des articles");
            return true;
        }
        this.setState({realisations: firstResponse.data.payload});

        if (secondResponse.data.error) {
            console.log("tu as une erreur dans la récupération des projets");
            return true;
        }

       await this.setState({projets: secondResponse.data.payload});
    }

    render() {

        const
            LIENS = [
                {route: "/cv", nom: "CV", component: CvPage, exact: true, icon: "CV", link: true},
                {route: "/realisations", nom: "Réalisations", component: RealisationsPage, exact: true, icon: "Realisations", link: true},
                {route: "/realisations/:id", component: RealisationArticle, exact: false, link: false},
                {route: "/contact", nom: "Contact", component: ContactPage, exact: true, icon: "Contact", link: true},
                {route: "/mentions-legales", nom: "mentions-legales", component: MentionsLegalesPage, exact: true,  link: false},
                {route: "/pendus", nom: "pendus", component: PagePendus, exact: true,  link: false}
            ];

        let liensNavigation = LIENS.filter(function (element) {
                return element.link ? element : false;
            });

        const
            listeLiensRouter = LIENS.map((element, i) => (
                <Route key={i} path={element.route} exact={element.exact} component={element.component}/>
            ));

        return (
            <Provider tabRea={this.state.realisations} tabProjets={this.state.projets } tabLiens={liensNavigation} api={this.state.api} >
                <App tabRoute={listeLiensRouter}/>
            </Provider>

        );
    }

}


export default RouteComposant;
