import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';
import FontAwesome from 'react-fontawesome';
import { Stage, Layer, Image } from 'react-konva';

import classnames from 'classnames';

import { applyCanvasMask } from 'app/utils/canvas';

import grayBoardImg from 'assets/images/gray_board.png';

import style from './style.scss';


class Viewer extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    responsive: PropTypes.bool,
    menu: PropTypes.bool,
    deck: PropTypes.object,
    truck: PropTypes.object,
    wheel: PropTypes.object,
    graphic: PropTypes.object,
    perspective: PropTypes.string.isRequired,
    handleChangePerspective: PropTypes.func.isRequired,
  }

  static defaultProps = {
    className: null,
    width: 700,
    height: 500,
    responsive: false,
    menu: false,
    deck: null,
    truck: null,
    wheel: null,
    graphic: null,
  }

  constructor(props) {
    super(props);

    const {
      width: canvasWidth,
      height: canvasHeight,
      deck,
      truck,
      wheel,
      graphic,
    } = props;

    this.state = {
      canvasWidth,
      canvasHeight,
      deck,
      truck,
      wheel,
      graphic,
    };

    this.handleResize = this.handleResize.bind(this);
    this.requestTick = this.requestTick.bind(this);
    this.renderCanvas = this.renderCanvas.bind(this);
  }

  componentDidMount() {
    const { responsive } = this.props;
    if (responsive) {
      this.handleResize();
      window.addEventListener('resize', this.requestTick);
    }

    this.loadImages();
  }

  componentWillReceiveProps(nextProps) {
    this.loadImages(nextProps);
  }

  loadImages(props = this.props) {
    const parts = ['deck', 'truck', 'wheel', 'graphic'];
    parts.forEach((part) => {
      const partData = props[part];
      if (partData !== null) {
        const image = new window.Image();
        image.src = partData.imageUrl;
        image.onload = () => {
          this.setState({
            [part]: {
              ...partData,
              image,
            },
          }, () => {
            const {
              deck,
              graphic,
            } = this.state;

            if (deck.image && graphic.image) {
              const maskedImage = new window.Image();
              const src = applyCanvasMask(
                graphic.image,
                deck.image,
                deck.image.width,
                deck.image.height,
                true,
              );

              maskedImage.src = src;
              maskedImage.onload = () => {
                this.setState({
                  deck: {
                    ...deck,
                    image: maskedImage,
                  },
                });
              };
            }
          });
        };
      }
    });
  }

  handleResize() {
    this.tick = false;

    const canvasWidth = this.viewerRef.clientWidth;
    const canvasHeight = this.viewerRef.clientHeight;

    this.setState({
      canvasWidth,
      canvasHeight,
    });
  }

  requestTick() {
    if (!this.tick) {
      requestAnimationFrame(this.handleResize);
    }
    this.tick = true;
  }

  renderCanvas() {
    const { perspective } = this.props;
    const orders = {
      top: ['truck', 'wheel', 'deck'],
      bottom: ['deck', 'truck', 'wheel'],
    };

    const {
      deck,
      canvasWidth,
      canvasHeight,
    } = this.state;
    if (deck === null || deck.image === undefined) {
      return null;
    }

    const { layout } = deck;

    const pad = 40;

    const paddedWidth = canvasWidth - (pad * 2);
    const paddedHeight = canvasHeight - (pad * 2);

    // find scale to make images fit in the viewer
    const ratioX = paddedWidth / deck.image.width;
    const ratioY = paddedHeight / deck.image.height;
    const ratio = ratioX < ratioY ? ratioX : ratioY;
    const scale = ratio < 1 ? ratio : 1;

    // place images in the center
    const deckHalfWidth = deck.image.width / 2;
    const deckHalfHeight = deck.image.height / 2;
    const centerX = ((paddedWidth / 2) - (deckHalfWidth * scale)) + pad;
    const centerY = ((paddedHeight / 2) - (deckHalfHeight * scale)) + pad;

    const layers = orders[perspective].map((part) => {
      const partData = this.state[part];
      if (partData === null || partData.image === undefined) {
        return null;
      }

      // set images in the center
      const { image } = partData;
      const halfWidth = image.width / 2;
      const halfHeight = image.height / 2;

      if (part === 'truck') {
        return (
          <Layer key={`${part}-layer`}>
            <Image image={image} x={layout.truckFrontX} y={layout.truckFrontY} />
            <Image
              image={image}
              offsetX={halfWidth}
              offsetY={halfHeight}
              rotation={180}
              x={layout.truckBackX + halfWidth}
              y={layout.truckBackY + halfHeight}
            />
          </Layer>
        );
      } else if (part === 'wheel') {
        return (
          <Layer key={`${part}-layer`}>
            <Image image={image} x={layout.wheel1X} y={layout.wheel1Y} />
            <Image image={image} x={layout.wheel2X} y={layout.wheel2Y} />
            <Image image={image} x={layout.wheel3X} y={layout.wheel3Y} />
            <Image image={image} x={layout.wheel4X} y={layout.wheel4Y} />
          </Layer>
        );
      }

      return (
        <Layer key={`${part}-layer`}>
          <Image image={image} />
        </Layer>
      );
    });

    return (
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        scaleX={scale}
        scaleY={scale}
        x={centerX}
        y={centerY}
      >
        {layers}
      </Stage>
    );
  }

  render() {
    const {
      className,
      deck,
      truck,
      wheel,
      perspective,
      menu,
      handleChangePerspective,
    } = this.props;

    return (
      <section
        className={className}
        styleName="viewer"
        ref={(viewerRef) => { this.viewerRef = viewerRef; }}
      >
        {menu ? (
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
        ) : null}
        {deck !== null || truck !== null || wheel !== null ? (
          <div styleName="viewer__canvas">
            {this.renderCanvas()}
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


export default CSS(Viewer, style, { allowMultiple: true });
