import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';
import FontAwesome from 'react-fontawesome';
import { Stage, Layer, Image } from 'react-konva';

import { capitalize } from 'app/utils/text';

import grayBoardImg from 'assets/images/gray_board.png';

import style from './style.scss';


class Viewer extends React.Component {
  static propTypes = {
    deck: PropTypes.object,
    truck: PropTypes.object,
    wheel: PropTypes.object,
    perspective: PropTypes.string.isRequired,
    handleChangePerspective: PropTypes.func.isRequired,
  }

  static defaultProps = {
    deck: null,
    truck: null,
    wheel: null,
  }

  constructor(props) {
    super(props);

    this.state = {
      canvasWidth: 700,
      canvasHeight: 500,
      deck: null,
      truck: null,
      wheel: null,
    };

    this.handleResize = this.handleResize.bind(this);
    this.renderLayers = this.renderLayers.bind(this);
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps) {
    this.loadImage(nextProps, 'deck');
    this.loadImage(nextProps, 'truck');
    this.loadImage(nextProps, 'wheel');
  }

  loadImage(props, part) {
    const partData = props[part];
    if (partData !== null) {
      const image = new window.Image();
      image.src = partData[`image${capitalize(props.perspective)}`];
      image.onload = () => {
        this.setState({
          [part]: {
            ...partData,
            image,
          },
        });
      };
    }
  }

  handleResize() {
    this.setState({
      canvasWidth: this.viewerRef.clientWidth,
      canvasHeight: this.viewerRef.clientHeight,
    });
  }

  renderLayers() {
    const { perspective } = this.props;
    const orders = {
      top: ['truck', 'wheel', 'deck'],
      bottom: ['deck', 'truck', 'wheel'],
    };

    return orders[perspective].map((part) => {
      if (this.state[part] !== null) {
        return (
          <Layer key={`${part}-layer`}>
            <Image image={this.state[part].image} />
          </Layer>
        );
      }
      return null;
    });
  }

  render() {
    const {
      deck,
      truck,
      wheel,
      perspective,
      handleChangePerspective,
    } = this.props;

    return (
      <section
        styleName="viewer"
        ref={(viewerRef) => { this.viewerRef = viewerRef; }}
      >
        <div styleName="viewer__menu">
          <button
            styleName="viewer__menu__icon"
            data-perspective={perspective === 'top' ? 'bottom' : 'top'}
            onClick={handleChangePerspective}
          >
            <FontAwesome name="refresh" />
            뒤집기
          </button>
          <button styleName="viewer__menu__icon">
            <FontAwesome name="search" />
            확대
          </button>
        </div>
        {deck !== null || truck !== null || wheel !== null ? (
          <div styleName="viewer__canvas">
            <Stage
              width={this.state.canvasWidth}
              height={this.state.canvasHeight}
            >
              {this.renderLayers()}
            </Stage>
          </div>
        ) : (
          <div styleName="viewer__not-selected">
            <img src={grayBoardImg} alt="우측 아이템을 선택해주세요" />
            <p>우측 아이템을 선택해주세요</p>
          </div>
        )}
      </section>
    );
  }
}


export default CSS(Viewer, style);
