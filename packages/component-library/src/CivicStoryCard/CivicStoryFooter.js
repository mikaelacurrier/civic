import { Component } from "react";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { get } from "lodash";
import window from "global/window";
import CivicStoryLink from "./CivicStoryLink";
import { ICONS } from "../styleConstants";

const MS_TO_SWITCH_TEXT = 3000; // 3 seconds

const actionsClass = css`
  background: #eee;
  display: flex;
  justify-content: space-between;
  margin: -3em;
  margin-top: 2em;
  padding: 0 3em;
  @media (max-width: 640px) {
    margin: -3em -2em;
    margin-top: 2em;
    padding: 0;
  }
`;

const alignRight = css`
  margin-left: 0;
  display: flex;
`;

const alignLeft = css`
  margin-right: 0;
  display: flex;
`;

export default class StoryFooter extends Component {
  static defaultProps = {
    slug: "some-card-id"
  };

  static propTypes = {
    slug: PropTypes.string,
    source: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  setToFalse = () => this.setState({ copied: false });

  handleCopy = () => {
    const { slug } = this.props;
    // NOTE: we need to make sure this will work on all browsers
    copy(`${get(window, "location.origin", "")}/cards/${slug}`);
    this.switchState(MS_TO_SWITCH_TEXT);
    this.setState({ copied: true });
  };

  switchState = ms => setTimeout(this.setToFalse, ms);

  render() {
    const { slug, source } = this.props;
    const { copied } = this.state;
    const shareTxt = copied ? "Copied!" : "Share"; // if copied, show Link copied, otherwise, show Share card
    const shareIcon = copied ? ICONS.check : ICONS.link;
    const isEmbedded =
      `${get(window, "location.origin", "")}/cards/${slug}/embed/` ===
      get(window, "location.href", "");
    const issue = `https://github.com/hackoregon/civic/issues/new?labels=type%3Astory-card&template=story-card-improve.md&title=[FEEDBACK] ${slug}`;

    return (
      <div css={actionsClass}>
        <div css={alignLeft}>
          <CivicStoryLink
            link={source}
            embed={isEmbedded}
            route={source ? undefined : `/cards/${slug}`}
            icon={ICONS.info}
          >
            Source
          </CivicStoryLink>
        </div>
        <div css={alignRight}>
          <CivicStoryLink
            additionalClassName={alignRight}
            link={issue}
            embed={isEmbedded}
            icon={ICONS.improve}
          >
            Improve
          </CivicStoryLink>
          <CivicStoryLink
            additionalClassName={alignRight}
            action={this.handleCopy}
            icon={shareIcon}
          >
            {shareTxt}
          </CivicStoryLink>
        </div>
      </div>
    );
  }
}
