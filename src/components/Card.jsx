import PropTypes from 'prop-types';
import React from 'react';

class Card extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      removeCard,
      hasbutton } = this.props;
    return (
      <div className="card-preview">

        <h1 className="nome-card" data-testid="name-card">{ cardName }</h1>
        <img data-testid="image-card" src={ cardImage } alt={ cardName } />
        <p
          className="description-card"
          data-testid="description-card"
        >
          { cardDescription }
        </p>
        <p className="atributo" data-testid="attr1-card">
          { `Agilidade:
          ${cardAttr1} `}
        </p>
        <p className="atributo" data-testid="attr2-card">
          { `Ataque:
          ${cardAttr2}
          `}
        </p>
        <p className="atributo" data-testid="attr3-card">
          {`Defesa:
          ${cardAttr3}`}
        </p>
        <h3 className="card-rare" data-testid="rare-card">{ cardRare }</h3>
        { cardTrunfo && (
          <span className="super" data-testid="trunfo-card">
            Super Trunfo
          </span>)}
        { hasbutton && (
          <button
            data-testid="delete-button"
            type="button"
            onClick={ () => removeCard(cardName) }
          >
            Excluir
          </button>)}
      </div>
    );
  }
}

export default Card;

Card.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  removeCard: PropTypes.func,
  hasbutton: PropTypes.bool,
}.isRequired;
