import PropTypes from 'prop-types';
import React from 'react';
import Card from './Card';

class Newgame extends React.Component {
  render() {
    const { newGame, nextCard } = this.props;
    return (
      <div>
        <div className="start">
          {
            newGame
              .filter((card, index) => index === nextCard)
              .map((card) => (
                <div className="cards" key={ card.cardName }><Card { ...card } /></div>
              ))
          }
        </div>
      </div>
    );
  }
}

export default Newgame;

Newgame.propTypes = {
  newGame: PropTypes.bool,
  nextCard: PropTypes.number,
}.isrequired;
