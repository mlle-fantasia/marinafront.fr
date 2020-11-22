import { Grid, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import "./Admin.css";
import AdminArticlesList from "./AdminArticlesList";
import AdminPosts from "./AdminPosts";
import AdminUserForm from "./AdminUserForm";

function Admin() {
	const [onglet, setOnglet] = useState(1);
	//const [loginOK, setLoginOk] = useState(true);

	return (
		<Grid>
			{/* {this.redirectToLogin()} */}
			<div className="admin">
				<Row className="">
					<Col md={12}>
						<Row className="navAdmin d-flex flex-row justify-content-around">
							<Col md={2} className={`"admin-sousTitre" ${onglet === 1 ? "onglet-actif" : ""}`} onClick={() => setOnglet(1)}>
								<p>Les articles</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === 2 ? "onglet-actif" : ""}`} onClick={() => setOnglet(2)}>
								<p>Les projets oc</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === 3 ? "onglet-actif" : ""}`} onClick={() => setOnglet(3)}>
								<p>Les Posts</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === 5 ? "onglet-actif" : ""}`} onClick={() => setOnglet(5)}>
								<p>Les certificats</p>
							</Col>
							<Col md={2} className={`"admin-sousTitre" ${onglet === 6 ? "onglet-actif" : ""}`} onClick={() => setOnglet(6)}>
								<p>Infos perso</p>
							</Col>
						</Row>
						<Row className="onglet">
							{(() => {
								switch (onglet) {
									case 1:
										return <AdminArticlesList />;
									case 2:
										return <AdminArticlesList projetOC={true} />;
									case 3:
										return <AdminPosts />;
									case 5:
										return "les certificats";
									case 6:
										return <AdminUserForm />;
									default:
										return <AdminArticlesList />;
								}
							})()}
						</Row>
					</Col>
				</Row>
			</div>
		</Grid>
	);
}
export default Admin;
