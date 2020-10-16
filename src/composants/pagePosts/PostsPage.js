import React, { Component } from "react";
import CvHeader from "../pageCv/CvHeader.js";
import "./PostsPage.css";
import "@ladjs/bootstrap-social/bootstrap-social.css";
import "font-awesome/css/font-awesome.css";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavIcons from "../NavIcons";
import axios from "axios";
import Masonry from "react-masonry-css";

class PostsPage extends Component {
	constructor() {
		super();
		this.getPostsList();
	}

	state = {
		posts: [],
	};

	getPostsList() {
		axios.get(process.env.REACT_APP_API_MARINAFRONT + "/posts/list").then((response) => {
			if (response.data.error) {
				console.log("tu as une erreur");
				return true;
			}
			let posts = response.data;
			this.setState({ posts });
		});
	}

	render() {
		return (
			<div>
				<CvHeader />
				<Grid className="realisation">
					<Row>
						<Col xs={12} md={6}>
							<h2>
								<span className="glyfTitre glyphicon glyphicon-th"></span>
								<div className="petitTitre">Posts techniques :</div>
							</h2>
						</Col>
					</Row>
					<Row className="mb-5">
						<Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="masonry-col">
							{this.state.posts.map((object) => (
								<div key={object.id} className="card">
									<Link to={"/posts/" + object.id + "#top"}>
										<div>
											<img
												className="card-img-top img-fluid"
												src={process.env.REACT_APP_API_MARINAFRONT + "/posts/" + object.id + "/image"}
												alt="Card image cap"
											/>
											<div className="card-block">
												<h4 className="card-title">{object.title}</h4>
												<p className="card-text">
													This card has supporting text below as a natural lead-in to additional content.
												</p>
												<p className="card-date">
													<small className="text-muted">Last updated 3 mins ago</small>
												</p>
											</div>
										</div>
									</Link>
								</div>
							))}
						</Masonry>
					</Row>
				</Grid>

				<NavIcons />
			</div>
		);
	}
}

export default PostsPage;
