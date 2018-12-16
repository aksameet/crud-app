import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/index';
import Modal from './Modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            active: false,
            chosen: null,
            modalKeyword: ''
        };
    }

    componentDidMount() {
        // localStorage.clear()
        this.props.fetchRecipes();
    }

    showModal(keyword) {
        this.setState({ 
            show: true,
            modalKeyword: keyword});
    }

    hideModal = () => {
        this.setState({ show: false });
    }

    toggleClass(id) {
        const currentState = this.state.active;
        this.setState({ 
            active: !currentState,
            chosen: id
        });
    };

    onDeleteClick(index) {
        localStorage.removeItem(index);
        this.props.fetchRecipes();
    }

    renderList() {
        if (this.props.recipes) {

            return _.map(this.props.recipes, (recipe, index) => {
                const recipeParsed = JSON.parse(recipe);
                
                const { recipe_name, recipe_ingredients } = recipeParsed,
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
                                    onClick={this.onDeleteClick.bind(this, index)}>
                                Delete
                            </button>
                            <button className="button--normal" 
                                    onClick={this.showModal.bind(this, 'Edit')}>
                                Edit
                            </button>
                            </div>
                        </div>
                    </li>
                );
            });
        } else {
            return (
                <div key="0"></div>
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
                            onClick={this.showModal.bind(this, 'Add')}>
                        Add Recipe
                    </button>
                    <Modal 
                        modalKeyword={this.state.modalKeyword}
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

export default connect(mapStateToProps, { fetchRecipes })(App);
