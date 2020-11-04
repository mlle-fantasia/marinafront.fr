import React, { Component } from "react";
import "./RealisationsPage.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import { Grid, Row, Col } from "react-bootstrap";
import { HashLink as Link } from "react-router-hash-link";
import axios from "axios";
import RawHtml from "react-raw-html";
//import MyLightbox from "./MyLightbox";
import NavIcons from "../NavIcons";

class RealisationArticle extends Component {
	state = {
		article: {},
		projets: [],
		articleDemande: this.props.match.params.id,
		photos: [],
		liens: [],
		listeAside: [],
		projetVisible: 1000,
	};

	componentDidMount() {
		this.recupererInformationArticle(this.state.articleDemande);
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ articleDemande: nextProps.match.params.id });
		this.recupererInformationArticle(nextProps.match.params.id);
	}

	recupererInformationArticle(articleDemande) {
		axios
			.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/" + articleDemande, { headers: { Authorization: localStorage.getItem("token") } })
			.then((response) => {
				if (response.data.error) {
					console.log("tu as une erreur");
					return true;
				}
				this.setState({ article: response.data.article });
				this.setState({ liens: response.data.article.liens });
				this.setState({ listeAside: response.data.acticlesaside });
				this.setState({ projets: response.data.projets });
			});
		/* 		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/articles/liens/" + articleDemande, {}).then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			console.log(response);
			this.setState({ liens: response.data });
		}); */

		// axios.get(API + "/realisation-images.php?id=" + articleDemande).then((response) => {
		//     if (response.data.error) {
		//         console.log("tu as une erreur");
		//         return true;
		//     }
		//     let photos = response.data.payloadImages;
		//     this.setState({photos});
		// });
	}
	handleClickProjet(index) {
		if (index === this.state.projetVisible) {
			this.setState({ projetVisible: 1000 });
			this.isArticleVisible(1000);
		} else {
			this.setState({ projetVisible: index });
		}
	}
	isArticleVisible(i) {
		let projet = this.state.projets[i];
		if (this.state.projetVisible === i) {
			return <RawHtml.div className="texte">{projet.contenu}</RawHtml.div>;
		} else {
			return;
		}
	}
	render() {
		const { article } = this.state;

		// const galerie = photos.length !== 0 ?
		//     (<div>
		//         <h3 className="galerieTitre">Les images</h3>
		//         <div>
		//             <div className="mt-5 galerieImages">
		//                 <MyLightbox photos={photos}/>
		//             </div>
		//         </div>
		//     </div>)
		//     : (<div></div>);

		const leLiens = this.state.liens.length ? (
			<div>
				<h3 className="galerieTitre">Les liens</h3>
				<div>
					<div className="mt-5 galerieImages">
						{this.state.liens.map((lien, i) => (
							<div className="btnLienAside" key={i}>
								<a href={lien.url} target="_bank" rel="noopener noreferre" className="btn form-control btn-lien">
									{lien.nom}
								</a>
							</div>
						))}
					</div>
				</div>
			</div>
		) : (
			<div></div>
		);

		const autreRea = this.state.listeAside.length ? (
			<div>
				<h3 className="galerieTitre">Les autres réalisations</h3>
				<div>
					<div className="mt-5 galerieImages">
						{this.state.listeAside.map((article, i) => (
							<div className="btnLienAside" key={i}>
								<Link to={"/realisations/" + article.id + "#top"} key={article.id}>
									{article.title}
									<br />
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		) : (
			<div></div>
		);

		const projects = this.state.projets.length ? (
			<div className="mt-5 galerieImages">
				{this.state.projets.map((projet, i) => (
					<div className="li-projet" key={i}>
						<div className="pointer" onClick={() => this.handleClickProjet(i)}>
							<h5>
								{projet.title} ({projet.langage})
							</h5>
						</div>
						{this.isArticleVisible(i)}
					</div>
				))}
			</div>
		) : (
			<div></div>
		);

		return (
			<div>
				<Grid className="article">
					<Row>
						<Col xs={12} md={9} className="unArticle">
							<Row>
								<Col xs={12} md={12} className="texteArticle">
									<h2>
										<div className="titreArticle">{article.title}</div>
									</h2>
									<RawHtml.div className="texte">{article.contenu}</RawHtml.div>
								</Col>
								{projects}
								<Col className="btn-after-article" xs={12} md={6} sm={6}>
									<Link to={"/realisations#top"}>
										<button className="form-control btnRetour">Retour à la liste des réalisations</button>
									</Link>
								</Col>
								<Col className="btn-after-article" xs={12} md={6} sm={6}>
									<a href="#top">
										<button className="form-control btnRetour">Retour en haut de la page</button>
									</a>
								</Col>
							</Row>
						</Col>
						<Col xs={12} sm={12} md={3} className="images">
							{leLiens}
							{/*{galerie}*/}
							<div className="listeAsideCSS">
								<div className="">{autreRea}</div>
							</div>
						</Col>
					</Row>
				</Grid>
				<NavIcons />
			</div>
		);
	}
}

export default RealisationArticle;
