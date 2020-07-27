import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alert !== null &&
  alerts.length > 0 &&
  alerts.map((alert, index) => (
    <div
      key={alert.id}
      style={{
        position: "absolute",
        marginTop: `{9+9*${index}vh}`,
        zIndex: "100",
      }}
      className={`alert alert-${alert.alertType}`}
    >
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
