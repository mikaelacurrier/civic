import React, { useState } from "react";
import PropTypes from "prop-types";
import { resourceShape } from "reduxful/react-addons";
import { isLoaded } from "reduxful";
import { Link } from "react-router";

import {
  BaseMap,
  VisualizationColors,
  RadioButtonGroup,
  ScreenGridMap,
  ChartContainer
} from "@hackoregon/component-library";

const EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization = ({
  data
}) => {
  const hasLoaded = isLoaded(data.damageEstimates);
  const [dataType, setData] = useState("Commercial");

  const mapStyles = {
    Commercial: {
      field: "com_loss_r",
      opacity: 0.5,
      map: "light",
      buildingType: "commercial"
    },
    Residential: {
      field: "res_loss_r",
      opacity: 0.5,
      map: "light",
      buildingType: "residential"
    }
  };

  return (
    <>
      <RadioButtonGroup
        grpLabel="Type"
        labels={Object.keys(mapStyles)}
        value={dataType}
        onChange={event => {
          setData(event.target.value);
        }}
        row
      />
      <p>
        {hasLoaded ? (
          <small>
            Zoom for more granular details. A brighter color indicates more
            costly damage.
          </small>
        ) : (
          <small>
            <strong>Note:</strong> This visualization uses a large dataset and
            takes a long time to load
          </small>
        )}
      </p>
      <ChartContainer
        loading={!hasLoaded}
        title="Building Impact of a 9.0 Cascadia Earthquake"
        subtitle={`Estimated financial damage to ${
          mapStyles[dataType].buildingType
        } buildings in a Cascadia 9.0 earthquake.`}
      >
        {hasLoaded && data && (
          <>
            <BaseMap
              initialLongitude={-123.844}
              initialLatitude={45.4562}
              initialZoom={8}
              minZoom={8}
              maxZoom={14}
              updateViewport={false}
              civicMapStyle={mapStyles[dataType].map}
            >
              <ScreenGridMap
                data={data.damageEstimates.value}
                getPosition={f => f.geometry && f.geometry.coordinates}
                opacity={mapStyles[dataType].opacity}
                getWeight={f => f.properties[mapStyles[dataType].field]}
                getSize={() => 15}
                colorRange={VisualizationColors.sequential.thermal}
                getCursor={() => "default"}
              />
            </BaseMap>
            <Link to="/sandbox">See more in the Civic Sandbox</Link>
          </>
        )}
      </ChartContainer>
    </>
  );
};

EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization.propTypes = {
  data: PropTypes.shape({ earthquakeDamageEstimate: resourceShape })
};

export default EarthquakeDamageEstimatesForBuildingsInTillamookCountyVisualization;
