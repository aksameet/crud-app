import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';
import Modal from './Modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            active: false,
            chosen: null
        };
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    toggleClass(id) {
        console.log(id);
        const currentState = this.state.active;
        this.setState({ 
            active: !currentState,
            chosen: id
        });
    };

    renderList() {

        if (this.props.recipes) {
            return this.props.recipes.map((recipe, index) => {
                const { recipe_name, recipe_ingredients } = recipe,
                        itemStyles = `  App--content_list-item 
                                        ${this.state.chosen === index && this.state.active ? 'active': ''}
                                    `;

                return (
                    <li
                        key={index}
                        onClick={this.toggleClass.bind(this, index)} 
                        className={ itemStyles }
                    >
                        <span className="App--content_list-item-recipename">{recipe_name}</span>
                        <div className="App--content_list-item-ingredients_container">
                            <span className="App--content_list-item-ingredients_title">
                                Ingredients
                            </span>
                            <ul className="App--content_list-item-ingredients">
                                {this.renderIngredients(recipe_ingredients)}
                            </ul>
                            <div>
                            <button className="button--delete" 
                                    onClick={this.showModal}>
                                Delete
                            </button>
                            <button className="button--normal" 
                                    onClick={this.showModal}>
                                Edit
                            </button>
                            </div>
                        </div>
                    </li>
                );
            });
        } else {
            return (
                <div></div>
            )
        }
    }
    renderIngredients(ingredients) {
        if (ingredients) {
            let array = ingredients.split(',');
            return array.map((ingredient, index) => {
                return (
                    <li key={index}
                        className="App--content_list-item-ingredients_items">
                        {ingredient}
                    </li>
                )
            })
        } else {
            return (
                <div></div>
            )
        }
    }

    render() {
        return (
            <div className="App--container">
                <div className="App--content">
                    <ul className="App--content_list">
                        {this.renderList()}
                    </ul>
                    <button className="button--add" 
                            onClick={this.showModal}>
                        Add Recipe
                    </button>
                    <Modal 
                        modalKeyword="Add"
                        show={this.state.show}
                        handleClose={this.hideModal}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }) {
    return { recipes };
}

export default connect(mapStateToProps, {addRecipe})(App);
