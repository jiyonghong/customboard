import React from 'react';
import { PropTypes } from 'prop-types';
import CSS from 'react-css-modules';

import styles from './style.scss';


class OrderForm extends React.Component {
  static propTypes = {
    deck: PropTypes.object.isRequired,
    truck: PropTypes.object.isRequired,
    wheel: PropTypes.object.isRequired,
  }

  render() {
    const {
      deck,
      truck,
      wheel,
    } = this.props;

    return (
      <form styleName="order-form">
        <fieldset>
          <h3>선택한 세팅</h3>
        </fieldset>
        <fieldset>
          <h4>데크</h4>
          <div className="clearfix" styleName="order-form__indent">
            <p styleName="order-form__price">{deck.price.toLocaleString()}</p>
            <p styleName="order-form__name">{deck.name}</p>
          </div>
        </fieldset>
        <fieldset>
          <h4>트럭</h4>
          <div className="clearfix" styleName="order-form__indent">
            <p styleName="order-form__price">{truck.price.toLocaleString()}</p>
            <p styleName="order-form__name">{truck.name}</p>
          </div>
        </fieldset>
        <fieldset>
          <h4>휠</h4>
          <div className="clearfix" styleName="order-form__indent">
            <p styleName="order-form__price">{wheel.price.toLocaleString()}</p>
            <p styleName="order-form__name">{wheel.name}</p>
          </div>
        </fieldset>
        <fieldset styleName="order-form__dark-section">
          <div className="clearfix">
            <p styleName="order-form__price">
              {(deck.price + truck.price + wheel.price).toLocaleString()}
            </p>
            <p styleName="order-form__name">총 가격</p>
          </div>
        </fieldset>
        <fieldset>
          <h4>추가 주문 사항</h4>
          <textarea styleName="order-form__textarea" name="extra" />
          <button styleName="order-form__btn" type="submit">주문하기</button>
        </fieldset>
      </form>
    );
  }
}


export default CSS(OrderForm, styles);
