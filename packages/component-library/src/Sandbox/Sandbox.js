import { useState } from "react";
import {
  arrayOf,
  bool,
  func,
  number,
  string,
  shape,
  oneOfType
} from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import BaseMap from "../BaseMap/BaseMap";
import CivicSandboxMap from "../MultiLayerMap/MultiLayerMap";
import CivicSandboxTooltip from "../CivicSandboxMap/CivicSandboxTooltip";
import SandboxDrawer from "./SandboxDrawer";

const baseMapWrapper = css(`
  height: 80vh;
  min-height: 650px;
  @media (max-width: 850px) {
    height: 80vh;
    min-height: 600px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 75vh;
    min-height: 390px;
  }
`);

const Sandbox = ({
  data,
  layerData,
  defaultFoundation,
  defaultSlides,
  selectedPackage,
  selectedFoundation,
  selectedSlide,
  slideData,
  updatePackage,
  updateFoundation,
  updateSlide,
  fetchSlideDataByDate,
  drawerVisible,
  toggleDrawer,
  styles,
  onFoundationClick,
  onSlideHover,
  tooltipInfo,
  allSlides,
  selectedFoundationDatum,
  areSlidesLoading,
  errors,
  updateSlideKey
}) => {
  const [baseMapStyle, setBaseMapStyle] = useState("light");

  const handleBaseMapStyleChange = baseMapStyleChangeEvent => {
    // eslint-disable-next-line no-unused-expressions
    baseMapStyleChangeEvent.target.value === "light"
      ? setBaseMapStyle("light")
      : setBaseMapStyle("sandbox-dark");
  };

  return (
    <div css={styles}>
      <div
        css={css`
          position: absolute;
          top: 0;
          right: 0;
          padding: 0;
          margin: 0;
          width: 100%;
          height: 80vh;
          min-height: 650px;
          @media (max-width: 850px) {
            height: 80vh;
            min-height: 600px;
          }
          @media (max-width: 500px) {
            width: 100%;
            height: 75vh;
            min-height: 390px;
          }
        `}
      >
        <SandboxDrawer
          data={data}
          selectedSlide={selectedSlide}
          onChange={updateSlide}
          selectedPackage={selectedPackage}
          toggleDrawer={toggleDrawer}
          drawerVisible={drawerVisible}
          defaultSlides={defaultSlides}
          slideData={slideData}
          fetchSlideByDate={fetchSlideDataByDate}
          selectedFoundation={selectedFoundation}
          foundationData={layerData}
          defaultFoundation={defaultFoundation}
          allSlides={allSlides}
          updatePackage={updatePackage}
          updateFoundation={updateFoundation}
          foundationMapProps={layerData}
          onBaseMapStyleChange={handleBaseMapStyleChange}
          baseMapStyle={baseMapStyle}
          areSlidesLoading={areSlidesLoading}
          errors={errors}
          updateSlideKey={updateSlideKey}
        />
      </div>
      <div css={baseMapWrapper}>
        <BaseMap
          civicMapStyle={baseMapStyle}
          initialZoom={5}
          minZoom={5}
          maxZoom={16.5}
          initialLatitude={38}
          initialLongitude={-97}
          useContainerHeight
          updateViewport={false}
          useFitBounds
          bboxData={layerData.length > 0 ? layerData[0].data : []}
          bboxPadding={50}
          useScrollZoom
        >
          <CivicSandboxMap
            mapLayers={layerData}
            onLayerClick={onFoundationClick}
            onHoverSlide={onSlideHover}
            selectedFoundationDatum={selectedFoundationDatum}
          >
            {tooltipInfo && <CivicSandboxTooltip tooltipData={tooltipInfo} />}
          </CivicSandboxMap>
        </BaseMap>
      </div>
    </div>
  );
};

Sandbox.propTypes = {
  data: shape({
    packages: arrayOf(shape({})),
    slides: shape({})
  }).isRequired,
  layerData: arrayOf(shape({})).isRequired,
  defaultFoundation: shape({
    endpoint: string,
    name: string,
    visualization: string
  }),
  defaultSlides: arrayOf(
    shape({
      endpoint: string,
      name: string,
      visualization: string
    })
  ).isRequired,
  selectedPackage: string.isRequired,
  selectedFoundation: string.isRequired,
  selectedSlide: arrayOf(string).isRequired,
  slideData: arrayOf(shape({})).isRequired,
  updatePackage: func.isRequired,
  updateFoundation: func.isRequired,
  updateSlide: func.isRequired,
  fetchSlideDataByDate: func.isRequired,
  drawerVisible: bool.isRequired,
  toggleDrawer: func.isRequired,
  styles: string,
  onFoundationClick: func,
  onSlideHover: func,
  tooltipInfo: shape({
    content: arrayOf(shape({})),
    x: number,
    y: number
  }),
  allSlides: arrayOf(
    shape({
      checked: bool,
      color: arrayOf(number),
      endpoint: string,
      label: string,
      mapType: string,
      slideId: oneOfType([string, number])
    })
  ).isRequired,
  selectedFoundationDatum: arrayOf(
    shape({
      data: oneOfType([arrayOf(shape({})), number, string]),
      id: oneOfType([number, string]),
      title: string,
      visualizationType: string
    })
  ),
  areSlidesLoading: bool,
  updateSlideKey: func,
  errors: bool
};

export default Sandbox;
