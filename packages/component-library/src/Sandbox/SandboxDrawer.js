/* TODO: Fix linting errors */
/* eslint-disable */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import shortid from "shortid";
import Dropdown from "../Dropdown/Dropdown";
import SandboxDateSelector from "./SandboxDateSelector";
import SandboxToggleSwitch from "./SandboxToggleSwitch";
import SandboxMapLegend from "./SandboxMapLegend";
import SandboxBaseMapSelector from "./SandboxBaseMapSelector";
import Logo from "../Logo/Logo";
import Checkbox from '../Checkbox/Checkbox';

const menuOpen = css(`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 75vh;
  width: 33%;
  z-index: 5;
  transition: 0.5s;
  @media (max-width: 850px) {
    width: 95%;
    height: 64vh;
    min-height: 550px;
  }
  @media (max-width: 500px) {
    width: 100%;
    height: 64vh;
    min-height: 550px;
  }
`);

const menuClosed = css(`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  height: 75vh;
  width: 40px;
  z-index: 5;
  transition: 0.5s;

`);

const loadingContainer = css`
  display: flex;
  height: 250px;
  width: 100%;
  margin: auto;
`;
const loading = css`
  font-size: 2rem;
  margin: auto;
  text-align: center;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
`;

const SandboxDrawer = ({
  data,
  onChange,
  selectedPackage,
  toggleDrawer,
  drawerVisible,
  slideData,
  fetchSlideByDate,
  foundationData,
  defaultFoundation,
  allSlides,
  updatePackage,
  selectedFoundation,
  updateFoundation,
  foundationMapProps,
  onBaseMapStyleChange,
  baseMapStyle,
  defaultSlides,
  areSlidesLoading,
  errors,
  updateSlideKey
}) => {
  const loader = (
    <div css={loadingContainer}>
      <div css={loading}>
        <Logo type="squareLogoAnimated" alt="Loading..." />
      </div>
    </div>
  );
  return (
    <div css={drawerVisible ? menuOpen : menuClosed}>
      <div onClick={toggleDrawer}>
        <div
          css={css(`
          text-transform: uppercase;
          font-size: 1rem;
          cursor: pointer;
          background: #EE495C;
          color: #F3F2F3;
          min-width: 40px;
          text-align: center;
        `)}
        >
          <div
            css={css(`
            font-size: 1.4rem;
            color: #F3F2F3;
            line-height: 1.5;
            height: 35px;
            padding-left: 5px;
            @media (max-width: 850px) {
              font-size: 1.3rem;
            }
          `)}
          >
            {drawerVisible ? ">" : "<"}
          </div>
        </div>
      </div>
      {drawerVisible && (
        <div
          css={css(`
          background: rgba(243,242,243,0.9);
          overflow-y: auto;
          border: 1px solid #ddd;
          border-left: 0;
          border-radius: 2px;
          box-shadow: -10px 5px 15px -3px rgba(0, 0, 0, 0.2);
          flex-grow: 2;
        `)}
        >
          <div
            css={css(`
            margin: 0 0 10px 0;
            padding: 0;
            background-color: #201024;
            color: white;
            height: 35px;
            text-align: center;
          `)}
          >
            <h2
              css={css(`
              margin: 0;
            `)}
            >
              CIVIC Sandbox
            </h2>
          </div>
          
          {/* DATA COLLECTIONS */}
          <div
            css={css(`
            position: relative;
            z-index: 900;
          `)}
          >
            <h3
              css={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}
            >
              Data Collections
            </h3>
            <Dropdown
              value={selectedPackage}
              options={data.packages.map(p => ({
                value: p.displayName,
                label: p.displayName
              }))}
              onChange={name => {
                console.log("sandbox-drawer-data-c-e:", name);
                updatePackage({ displayName: name });
              }}
              simpleValue
            />
          </div>

          {/* FOUNDATIONS */}
          {/*<div
            css={css(`
            position: relative;
            z-index: 400;
          `)}
          >
          {foundationData && (
            <div>
              <div
                css={css(`
                position: relative;
                font-size: .75rem;
                color: #333;
                z-index: 300;
              `)}
              >
                {foundationData.slide_meta &&
                foundationData.slide_meta.dates.date_granularity ? (
                  <SandboxDateSelector
                    slide={defaultFoundation}
                    selectedSlideData={foundationData}
                    fetchSlideByDate={fetchSlideByDate}
                    type="foundation"
                  />
                ) : foundationData.slide_meta &&
                  foundationData.slide_meta.dates.default_date_filter ? (
                  <span
                    css={css(`
                      font-size: 22px;
                      font-weight: 400;
                      padding: 0 0 0 16px;
                      margin: 0;
                    `)}
                  >
                    {foundationData.slide_meta.dates.default_date_filter}
                  </span>
                ) : null}
              </div>

              <h2
                css={css(`
                color: #555;
                text-transform: uppercase;
                margin: 0 10px;
              `)}
              >
                Base map style
              </h2>
              {onBaseMapStyleChange && baseMapStyle && (
                <SandboxBaseMapSelector
                  onBaseMapStyleChange={onBaseMapStyleChange}
                  baseMapStyle={baseMapStyle}
                />
              )}
            </div>
          )}
          */}

          {/* SLIDES */}
          <div
            css={css(`
            position: relative;
            z-index: 200;
          `)}
          >
            <h3
              css={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}
            >
              Layers
            </h3>
          </div>

          {!areSlidesLoading && allSlides ? (
            allSlides.map((slide, index) => {
              // const defaultGray = [238, 238, 238, 255];
              // const backgroundSlideColor = slide.color;
              // const formatBackgroundColor = arr =>
              //   arr.reduce(
              //     (acc, cur, i) => (i < 3 ? `${acc + cur},` : `${acc}0.9)`),
              //     "rgba("
              //   );
              // const slideBackGroundColor = formatBackgroundColor(
              //   backgroundSlideColor
              // );
              // const blackTextColor = "rgba(0,0,0,1)";
              // const whiteTextColor = "rgba(255,255,255,1)";
              // const textColor =
              //   slideBackGroundColor === defaultGray
              //     ? blackTextColor
              //     : whiteTextColor;
              // console.log("drawer-allSlides-slide:", slide);
              // console.log("drawer-allSlides-index:", index);
    
              const dataIndex = foundationData.findIndex(d => {
                const scatterplot = d.mapType === "ScatterPlotMap" && d.layerInfo.displayName === slide.label;
                const choropleth = d.mapType === "ChoroplethMap" && d.layerInfo.displayName === slide.label;
                return choropleth || scatterplot;
              });

              const matchFound = dataIndex > -1 && foundationData[dataIndex].data.length > 0
              console.log("DRAWER-matchFound:", matchFound);

              const mapLegend = matchFound && (
                <SandboxMapLegend
                  data={foundationData[dataIndex].data}
                  mapProps={foundationMapProps[dataIndex]}
                />
              );

              const keyOptions = matchFound
                ? Object.keys(foundationData[dataIndex].data[0].properties)
                    .reduce((a,c,i) => {
                      const include = c.includes(foundationData[dataIndex].fieldName.color.match(/^[a-zA-Z]+/)) 
                      const menuYear = ["1990", "2000", "2010", "2017"]
                      return include ? [...a, {value: c, label: menuYear[i]} ] : a;
                    }, [])
                : []
              console.log("keyOptions:", keyOptions);

              const keySelector = matchFound && (
                  <Dropdown
                    value={foundationData[dataIndex].fieldName.color}
                    options={keyOptions}
                    onChange={name => {
                      // console.log("drawer-key:", {[slide.label]: name});
                      updateSlideKey({[slide.label]: name});
                    }}
                    simpleValue
                  />
              );

              return (
                <div key={shortid.generate()}>
                  <div
                    css={css(`
                    padding: 0.5rem 0 0 1rem;
                  `)}
                  >
                    <Checkbox
                      name={slide.label}
                      value={slide.checked}
                      onChange={onChange}
                      label={slide.label}
                    />
                  </div>
                  { mapLegend }
                  <div
                    css={css(`
                    padding: .5rem 0 .5rem 0;
                    font-size: .75rem;
                    color: #333;
                    position: relative;
                    z-index: ${10 - index};
                  `)}
                  >
                    {/* Key Selector */}
                    { keySelector }

                    {/*slide.checked &&
                    selectedSlideData.slide_meta &&
                    selectedSlideData.slide_meta.dates.date_granularity ? (
                      <SandboxDateSelector
                        selectedSlideData={selectedSlideData}
                        slide={slide}
                        fetchSlideByDate={fetchSlideByDate}
                        type="slide"
                      />
                    ) : slide.checked &&
                      selectedSlideData.slide_meta &&
                      selectedSlideData.slide_meta.dates.default_date_filter ? (
                      <span
                        css={css(`
                            font-size: 18px;
                            padding: 0 0 0 17px;
                            margin: 0;
                          `)}
                      >
                        {selectedSlideData.slide_meta.dates.default_date_filter}
                      </span>
                    ) : null */}
                  </div>
                </div>
              );
            })
          ) : (
            loader
          )}
          { errors
            ? <div
                css={css(`
                margin: auto;
                width: 80%;
              `)}
              >
                <p>There was an error fetching the data.</p>
              </div>
            : null
          }
        </div>
      )}
    </div>
  );
};

export default SandboxDrawer;
