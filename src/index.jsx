import '../style';
import React from 'react';
import PropTypes from 'prop-types';
import RcSlider from 'rc-slider/lib/Slider';
import RcRange from 'rc-slider/lib/Range';
import RcHandle from 'rc-slider/lib/Handle';
import Tooltip from '@gag/tooltip-web';

export interface SliderMarks {
  [key: number]: React.ReactNode | {
    style: React.CSSProperties,
    label: React.ReactNode,
  };
}

class Slider extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visibles: {},
    };
  }

  toggleTooltipVisible = (index, visible) => {
    this.setState(({ visibles }) => ({
      visibles: {
        ...visibles,
        [index]: visible,
      },
    }));
  }
  handleWithTooltip = ({ value, dragging, index, ...restProps }) => {
    const { tooltipPrefixCls, tipFormatter } = this.props;
    const { visibles } = this.state;
    return (
      <Tooltip
        prefixCls={tooltipPrefixCls}
        title={tipFormatter ? tipFormatter(value) : ''}
        visible={tipFormatter && (visibles[index] || dragging)}
        placement="top"
        transitionName="zoom-down"
        key={index}
      >
        <RcHandle
          {...restProps}
          onMouseEnter={() => this.toggleTooltipVisible(index, true)}
          onMouseLeave={() => this.toggleTooltipVisible(index, false)}
        />
      </Tooltip>
    );
  }

  render() {
    const { range, ...restProps } = this.props;
    if (range) {
      return <RcRange {...restProps} handle={this.handleWithTooltip} />;
    }
    return <RcSlider {...restProps} handle={this.handleWithTooltip} />;
  }
}
Slider.defaultProps = {
  prefixCls: 'ant-slider',
  tooltipPrefixCls: 'ant-tooltip',
  tipFormatter(value) {
    return value.toString();
  },
};
Slider.propTypes = {
  prefixCls: PropTypes.string,
  tooltipPrefixCls: PropTypes.string,
  range: PropTypes.bool,
  min: PropTypes.number,
  max: PropTypes.number,
  step:PropTypes.any,
  marks: PropTypes.any,//SliderMarks;
  dots: PropTypes.bool,
  value:PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
      ]),//SliderValue = number | [number, number];
  defaultValue: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.arrayOf(PropTypes.number)
      ]),
  included: PropTypes.bool,
  disabled: PropTypes.bool,
  vertical: PropTypes.bool,
  onChange: PropTypes.func,
  onAfterChange: PropTypes.func,
  tipFormatter:PropTypes.any
};
Slider.displayName = "Slider";
module.exports=Slider;
