/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { memo, Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getKitCreationItems, addItemToPlayerKit } from "../../../state/kit";
import { addPoints } from "../../../state/user";
import { palette } from "../../../constants/style";
import { MapStyle } from "../index";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import Kit from "./Kit";
import Timer from "../../../utils/timer";
import { goToNextChapter } from "../../../state/chapters";

const slide = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const bg = css`
  animation: ${slide} 6s ease-in-out infinite alternate;
  background-image: linear-gradient(
    -60deg,
    ${palette.lightLime} 50%,
    ${palette.lemon} 50%
  );
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
`;

const bg2 = css`
  animation-direction: alternate-reverse;
  animation-duration: 8s;
`;

const bg3 = css`
  animation-duration: 10s;
`;

const KitScreen = ({
  possibleItems,
  addPointsToState,
  addItemToPlayerKitInState,
  endChapter,
  chapterDuration = 60
}) => {
  const [chapterTimer] = useState(new Timer());
  const [percentComplete, setPercentComplete] = useState(0);

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCallback((t, p) => {
      setPercentComplete(p);
    });
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterDuration, chapterTimer, endChapter]);

  const onKitItemSelection = kitItem => {
    if (kitItem.good) {
      addItemToPlayerKitInState(kitItem.type);
      addPointsToState(kitItem.points);
    }
    return kitItem.good;
  };

  const checkIfItemIsGood = kitItem => kitItem.good;

  return (
    <Fragment>
      <MapStyle>
        <div css={bg} />
        <div css={[bg, bg2]} />
        <div css={[bg, bg3]} />
        <Kit />
      </MapStyle>
      <MatchLockInterface
        possibleItems={possibleItems}
        onOrbSelection={onKitItemSelection}
        checkItemIsCorrect={checkIfItemIsGood}
        activeScreen="kit"
        percentComplete={percentComplete}
      />
    </Fragment>
  );
};

KitScreen.propTypes = {
  possibleItems: PropTypes.arrayOf(
    PropTypes.shape({
      imageSVG: PropTypes.string,
      good: PropTypes.bool,
      onSelection: PropTypes.func,
      weighting: PropTypes.number
    })
  ),
  addPointsToState: PropTypes.func,
  addItemToPlayerKitInState: PropTypes.func,
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number
};

const mapStateToProps = state => ({
  possibleItems: getKitCreationItems(state)
});

const mapDispatchToProps = dispatch => ({
  addPointsToState: bindActionCreators(addPoints, dispatch),
  addItemToPlayerKitInState: bindActionCreators(addItemToPlayerKit, dispatch),
  endChapter() {
    dispatch(goToNextChapter());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(KitScreen));
