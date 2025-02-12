/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import {
  PageLayout,
  PullQuote,
  CivicCardLayoutClassic
} from "@hackoregon/component-library";
import PortlandFarmersMarkets from "../PortlandFarmersMarkets";
import FarmersMarketsOverTime from "../FarmersMarketsOverTime";

import "@hackoregon/component-library/assets/global.styles.css";

const sectionMarginSmall = css`
  display: block;
  margin: 12px auto;
`;
const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;
const sectionMaxWidthSmall = css`
  max-width: 700px;
`;
const sectionMaxWidthMedium = css`
  max-width: 900px;
`;
const sectionBodyHeading = css`
  margin: 80px auto 24px;
`;
const paragraphStyle = css`
  line-height: 2;
  font-size: 18px;
`;

const App = () => (
  <PageLayout
    teamTitle="Agriculture"
    heroTitle="Shopping Local, Farmers' Markets"
    heroSubtitle="A look at Farmers' Markets in Portland and nationally"
    overlay
  >
    <section css={[sectionMarginMedium, sectionMaxWidthSmall]}>
      <h1>Have We Hit Peak Farmers&apos; Market?</h1>
    </section>
    <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
      <p css={paragraphStyle}>
        There could be some stagnation in the number of new people buying local
        food. Or as the USDA puts it, “a plateau in consumer demand for local
        food.”
      </p>
      <p css={paragraphStyle}>
        Rising demand in the last several years has lead to the opening of many
        new markets. There were 8,268 farmers’ markets operating in 2014, up 180
        percent since 2006.
      </p>
    </section>
    <section css={[sectionMarginMedium, sectionMaxWidthMedium]}>
      <PullQuote quoteText="There were 8,268 farmers' markets operating in 2014, up 180% since 2006" />
    </section>
    <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
      <p css={paragraphStyle}>
        “In densely populated urban areas, farmers’ markets often compete with
        each other for vendors and consumers,” the report reads. “In other
        areas, newer, more strategically located farmers’ markets may lead to
        the decline of previously established markets.”
      </p>
    </section>
    <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
      <h2>The Local Food Economy Is Maturing</h2>
    </section>
    <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
      <p css={paragraphStyle}>
        Farmers markets may be a good marketing tool for a small farm, but they
        can be onerous to prepare for, with slim profit margins, says Sarah Low,
        a USDA economist and lead author on the report.
      </p>
      <p css={paragraphStyle}>
        Because of that Low says farms are increasingly using middlemen to sell
        to restaurants, grocery stores and distributors. With an increasing
        share of their produce, dairy or meat going to those channels, some
        farmers may choose to forgo the farmers market.
      </p>
    </section>
    <section className={sectionMarginMedium}>
      <FarmersMarketsOverTime Layout={CivicCardLayoutClassic} />
    </section>
    <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
      <h2>How does Portland look today?</h2>
    </section>
    <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
      <p css={paragraphStyle}>
        Portland has a nation-wide reputation for being progressive consumers.
        This label holds up when you consider how many farmers&apos; markets are
        available to Portlanders. It&apos;s clear that there is something about
        this city that attracts grassroot and local initiatives.
      </p>
    </section>
    <section className={sectionMarginMedium}>
      <PortlandFarmersMarkets Layout={CivicCardLayoutClassic} />
    </section>
    <section css={[sectionBodyHeading, sectionMaxWidthSmall]}>
      <h2>There is room for more</h2>
    </section>
    <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
      <p css={paragraphStyle}>
        If complete saturation of farmers&apos; markets means having an
        accessible farmers&apos; market from every neighborhood in the city,
        then we have progress still to make. Portlanders living in the innermost
        (and also most expensive) neighborhoods have their fill of options, but
        neighborhoods on the outskirts of the city and in the suburbs need to
        commute for the same options.
      </p>
    </section>
  </PageLayout>
);

App.displayName = "App";

export default App;
