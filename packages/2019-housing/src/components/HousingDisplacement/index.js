import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { isLoaded } from "reduxful";
import { resourceShape } from "reduxful/react-addons";
import { CivicCard } from "@hackoregon/component-library";

import housingDisplacementMeta from "./housingDisplacementMeta";
import api from "../../state/housing-displacement/api";

const HousingDisplacement = ({ init, data, Layout }) => {
  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading =
    !isLoaded(data.homeownershipByRace) ||
    !isLoaded(data.homeownershipHistoricallyBlack20) ||
    !isLoaded(data.homeownershipHistoricallyBlack40) ||
    !isLoaded(data.homeownershipHistoricallyBlack60);

  return (
    <CivicCard
      cardMeta={housingDisplacementMeta}
      isLoading={loading}
      data={data}
      Layout={Layout}
    />
  );
};

HousingDisplacement.displayName = "HousingDisplacement";

HousingDisplacement.propTypes = {
  init: PropTypes.func,
  data: PropTypes.shape({ homeownershipByRace: resourceShape }),
  Layout: PropTypes.func
};

export default connect(
  state => ({
    data: {
      homeownershipByRace: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state
      ),
      homeownershipHistoricallyBlack60: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state,
        { "1990-black-pop-proportion-floor": 0.6 }
      ),
      homeownershipHistoricallyBlack40: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state,
        { "1990-black-pop-proportion-floor": 0.4 }
      ),
      homeownershipHistoricallyBlack20: api.selectors.getHomeownershipByRaceData(
        state.package2019Housing || state,
        { "1990-black-pop-proportion-floor": 0.2 }
      )
    }
    // state.packageProjectName || state needed to make work in the project package and 2018 package
  }),
  dispatch => ({
    init() {
      dispatch(api.actionCreators.getHomeownershipByRaceData());
      dispatch(
        api.actionCreators.getHomeownershipByRaceData({
          "1990-black-pop-proportion-floor": 0.6
        })
      );
      dispatch(
        api.actionCreators.getHomeownershipByRaceData({
          "1990-black-pop-proportion-floor": 0.4
        })
      );
      dispatch(
        api.actionCreators.getHomeownershipByRaceData({
          "1990-black-pop-proportion-floor": 0.2
        })
      );
    }
  })
)(HousingDisplacement);
