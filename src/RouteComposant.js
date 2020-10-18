import React, { Component } from "react";
import App from "./App";
import { Route } from "react-router-dom";
import Provider from "./Provider";

// les composants
import CvPage from "./composants/pageCv/CvPage";
import ContactPage from "./composants/pageContact/ContactPage";
import RealisationsPage from "./composants/pageRealisation/RealisationsPage";
import PostsPage from "./composants/pagePosts/PostsPage";
import Post from "./composants/pagePosts/Post";
import RealisationArticle from "./composants/pageRealisation/RealisationArticle";
import MentionsLegalesPage from "./composants/MentionsLegalesPage";
import PagePendus from "./composants/pageRealisation/PagePendus";
import Login from "./composants/admin/Login";
import Admin from "./composants/admin/Admin";

import axios from "axios";

class RouteComposant extends Component {
	state = {
		user: {},
	};

	componentDidMount() {
		// on récupère l'utilisateur, pour afficher les infos sur tout le site (footer, page contact)
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/user").then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			const user = response.data[0];
			this.setState({ user });
		});
	}

	render() {
		const LIENS = [
			{ route: "/cv", nom: "CV", component: CvPage, exact: true, icon: "CV", link: true },
			{ route: "/realisations", nom: "Réalisations", component: RealisationsPage, exact: true, icon: "Realisations", link: true },
			{ route: "/posts", nom: "Posts techniques", component: PostsPage, exact: true, link: true },
			{ route: "/posts/:id", component: Post, exact: false, link: false },
			{ route: "/realisations/:id", component: RealisationArticle, exact: false, link: false },
			{ route: "/contact", nom: "Contact", component: ContactPage, exact: true, icon: "Contact", link: true },
			{ route: "/mentions-legales", nom: "mentions-legales", component: MentionsLegalesPage, exact: true, link: false },
			{ route: "/pendus", nom: "pendus", component: PagePendus, exact: true, link: false },
			{ route: "/fantasia", nom: "login", component: Login, exact: true, link: false },
			{ route: "/fantasia/admin", nom: "admin", component: Admin, exact: true, link: false },
		];

		let liensNavigation = LIENS.filter(function (element) {
			return element.link ? element : false;
		});

		const listeLiensRouter = LIENS.map((element, i) => (
			<Route key={i} path={element.route} exact={element.exact} component={element.component} />
		));

		return (
			<Provider user={this.state.user} tabLiens={liensNavigation}>
				<App tabRoute={listeLiensRouter} />
			</Provider>
		);
	}
}

export default RouteComposant;
