import React from 'react';
import Card from './components/Card';
import Form from './components/Form';
import cartas from './data';
import './index.css';

// dica dada na academia de Logica do Jessen sobre o INITIAL_STATE e dica sobre spread do Thiago da Monitoria de projeto
const INITIAL_STATE = {
  cardName: '',
  cardDescription: '',
  cardAttr1: 0,
  cardAttr2: 0,
  cardAttr3: 0,
  cardImage: '',
  cardRare: 'normal',
};

class App extends React.Component {
  state = {
    ...INITIAL_STATE,
    hasTrunfo: false,
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    cardList: cartas,
    cardFilter: '',
    cardFilterAll: 'todas',
    cardFilterTrunfo: false,
  };

  componentDidMount() {
    const getStorage = JSON.parse(localStorage.getItem('savedCard'));

    if (getStorage !== null) {
      this.setState({
        cardList: getStorage,
      });
    }
  }

  validation = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare } = this.state;

    const maxAtt = 90;
    const sumAtt = 210;

    const validateCamp = cardName.length === 0
    || cardDescription.length === 0
    || cardImage.length === 0
    || cardRare.length === 0;

    const sum = Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > sumAtt;

    const values = Number(cardAttr1) > maxAtt
    || Number(cardAttr2) > maxAtt
    || Number(cardAttr3) > maxAtt;

    const negativeValues = Number(cardAttr1) < 0
    || Number(cardAttr2) < 0
    || Number(cardAttr3) < 0;

    this.setState({
      isSaveButtonDisabled: (validateCamp || sum || values || negativeValues),
    });
  };

  handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({
      [name]: value,
    }, this.validation);
  };

  saveStorage = () => {
    const { cardList } = this.state;
    localStorage.setItem('savedCard', JSON.stringify(cardList));
  };

  onSaveButtonClick = (event) => {
    event.preventDefault();

    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo } = this.state;

    const newCard = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo };

    this.setState((prevState) => ({
      cardList: [...prevState.cardList, newCard], cardTrunfo: false,
    }), this.saveStorage);

    if (cardTrunfo) {
      this.setState({
        isDisabledButton: false, hasTrunfo: true,
      });
    }

    this.setState({ ...INITIAL_STATE });
  };

  removeCard = (index) => {
    const { cardList } = this.state;
    const newCard = cardList.filter((element) => element.hasTrunfo === 1
    || element.cardName !== index);
    this.setState({
      cardList: [...newCard], hasTrunfo: false,
    });
  };

  // função para filtrar por nome
  filterCard = ({ target: { value } }) => {
    this.setState({
      cardFilter: value,
    });
  }; // referencia aula de sucos Maite

  // função para filtrar por raridade
  filterCardA = ({ target: { value } }) => {
    this.setState({
      cardFilterAll: value,
    });
  };

  // função para filtrar por Super Trunfo
  filterCardTrunfo = ({ target: { checked } }) => {
    this.setState({
      cardFilterTrunfo: checked,
    });
  };

  render() {
    const { ...state } = this.state;
    const { cardList,
      cardFilter,
      cardFilterAll,
      cardFilterTrunfo } = this.state;
    return (
      <div className="container">
        <header className="header">
          <h1>Card Trunfo</h1>
        </header>
        <div className="container1">
          <Form
            { ...state }
            onInputChange={ this.handleChange }
            onSaveButtonClick={ this.onSaveButtonClick }
          />
          <Card { ...state } />
        </div>
        <div className="filter">
          <label htmlFor="cardFilter">
            Filtro:
            <input
              data-testid="name-filter"
              type="text"
              name="cardFilter"
              id="cardFilter"
              disabled={ cardFilterTrunfo }
              onChange={ this.filterCard }
            />
          </label>
          <label htmlFor="cardFilterAll">
            Filtro por Raridade:
            <select
              data-testid="rare-filter"
              name="cardFilterAll"
              id="cardFilterAll"
              disabled={ cardFilterTrunfo }
              onChange={ this.filterCardA }
            >
              <option value="todas">todas </option>
              <option value="normal">normal</option>
              <option value="raro">raro</option>
              <option value="muito raro">muito raro</option>
            </select>
          </label>
          <label htmlFor="cardFilterTrunfo">
            Super Trunfo:
            <input
              data-testid="trunfo-filter"
              type="checkbox"
              name="cardFilterTrunfo"
              id="cardFilterTrunfo"
              checked={ cardFilterTrunfo }
              onChange={ this.filterCardTrunfo }
            />
          </label>
        </div>
        <div className="container-cards">

          {cardList.filter((card) => card.cardName.includes(cardFilter))
            .filter((card) => ((card
              .cardRare === cardFilterAll && card.cardName)
            || (cardFilterAll === 'todas' && card.cardName)))
            .filter((card) => {
              if (cardFilterTrunfo) {
                return card.cardTrunfo;
              }
              return card;
            })
            .map((card) => (
              <div className="save-card" key={ card.cardName }>
                <Card { ...card } removeCard={ this.removeCard } hasbutton />
              </div>
            ))}
        </div>
        <footer>
          <hr />
          <h2>Copyright Filipe Bueno</h2>
          <p>imagens ilustrativas Disney</p>
        </footer>
      </div>
    );
  }
}
export default App;
