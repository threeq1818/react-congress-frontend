// components/TwoValueSlider.js

import { withStyles } from "@material-ui/core/styles";
import Slider from '@material-ui/core/Slider';

const TwoValueSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0"
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -8,
    marginLeft: -8,
    boxShadow: "#ebebeb 0px 2px 2px",
    "&:focus,&:hover,&$active": {
      boxShadow: "#ccc 0px 2px 3px 1px"
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1
    }
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)"
  },
  track: {
    height: 3
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3
  }
})(Slider);

export default TwoValueSlider;