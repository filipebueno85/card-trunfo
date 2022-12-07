import PropTypes from 'prop-types';
import React from 'react';

class Form extends React.Component {
  render() {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick } = this.props;
    return (
      <form className="form-container" onSubmit={ onSaveButtonClick }>
        <fieldset className="field">
          <p>Crie seu personagem!</p>
          <label htmlFor="cardName">
            Nome:
            <input
              data-testid="name-input"
              type="text"
              name="cardName"
              id="cardName"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          Descrição:
          <label htmlFor="cardDescription">
            <textarea
              data-testid="description-input"
              name="cardDescription"
              id="cardDescription"
              cols="30"
              rows="10"
              value={ cardDescription }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr1">
            Agilidade:
            <input
              data-testid="attr1-input"
              type="number"
              name="cardAttr1"
              id="cardAttr1"
              value={ cardAttr1 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr2">
            Ataque:
            <input
              data-testid="attr2-input"
              type="number"
              name="cardAttr2"
              id="cardAttr2"
              value={ cardAttr2 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardAttr3">
            Defesa:
            <input
              data-testid="attr3-input"
              type="number"
              name="cardAttr3"
              id="cardAttr3"
              value={ cardAttr3 }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardImage">
            Imagem:
            <input
              data-testid="image-input"
              type="text"
              name="cardImage"
              id="cardImage"
              value={ cardImage }
              onChange={ onInputChange }
            />
          </label>
          <label htmlFor="cardRare">
            Raridade:
            <select
              data-testid="rare-input"
              name="cardRare"
              id="cardRare"
              value={ cardRare }
              onChange={ onInputChange }
            >
              <option
                value="normal"
              >
                normal
              </option>
              <option
                value="raro"
              >
                raro
              </option>
              <option
                value="muito raro"
              >
                muito raro
              </option>
            </select>
          </label>
          { hasTrunfo ? (<span>Você já tem um Super Trunfo em seu baralho </span>) : (

            <label htmlFor="cardTrunfo">
              Super Trunfo:
              <input
                data-testid="trunfo-input"
                type="checkbox"
                name="cardTrunfo"
                id="cardTrunfo"
                checked={ cardTrunfo }
                onChange={ onInputChange }
              />
            </label>
          ) }
          <button
            disabled={ isSaveButtonDisabled }
            type="submit"
            data-testid="save-button"
            onClick={ onSaveButtonClick }
          >
            Salvar
          </button>
        </fieldset>
      </form>
    );
  }
}

export default Form;

Form.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
}.isRequired;
