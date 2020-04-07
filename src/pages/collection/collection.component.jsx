import React from "react";
import { connect } from "react-redux";
import { selectCollection } from "../../redux/shop/shop.selectors";
import "./collection.styles.scss";

const CollectionPage = ({ collection }) => (
  <div className="collection-page">COLLECTION PAGE</div>
);

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.path.params.collectionId)(state), //! why's 'state' there??
});

export default connect(mapStateToProps)(CollectionPage);
