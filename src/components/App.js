import '../style/App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';
import Modal from './Modal';

class App extends Component {

    renderList() {

        if (this.props.recipes) {
            return this.props.recipes.map(recipe => {
                const { recipe_name, recipe_ingredients } = recipe;
                return (
                    <li
                        key={recipe_name}
                        // onClick={() => this.props.addRecipe(recipe)}
                        className="recipes--list_item"
                    >
                        {recipe_ingredients}
                    </li>
                );
            });
        } else {
            return (
                <div></div>
            )
        }

    }

    render() {
        return (
            <div className="App">
                <div className="App--content">
                    <ul className="recipes--list">
                        {this.renderList()}
                    </ul>
                    <Modal />
                </div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }) {
    return { recipes };
}

export default connect(mapStateToProps, {addRecipe})(App);
