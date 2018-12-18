import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes, editRecipes } from '../actions/index';
import Modal from './Modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
            active: false,
            chosen: null,
            modalKeyword: '',
            idCounter: 0
        };
    };

    componentDidMount() {
        // localStorage.clear();
        this.props.fetchRecipes();
    };


    // --------- Modal helpers --------- //

    hideModal = () => {
        this.setState({ show: false });
    };


    // --------- Buttons helpers --------- //

    onAddClick(keyword) {
        this.setState({
            idCounter: this.state.idCounter + 1,
            show: true,
            modalKeyword: keyword});
    };

    onDeleteClick(index) {
        localStorage.removeItem(index);
        this.props.fetchRecipes();
    };

    onEditClick(keyword, index) {

        this.props.editRecipes(index);
        
        this.setState({ 
            show: true,
            modalKeyword: keyword
        });
    };
    
    toggleClass(id) {
        const currentState = this.state.active;
        this.setState({ 
            active: !currentState,
            chosen: id
        });
    };


    // --------- Rendering --------- //

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
                                    onClick={this.onEditClick.bind(this, 'Edit', index, recipeParsed)}>
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
    };
    
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
    };

    render() {
        return (
            <div className="App--container">
                <div className="App--content">
                    <ul className="App--content_list">
                        {this.renderList()}
                    </ul>
                    <button className="button--add" 
                            onClick={this.onAddClick.bind(this, 'Add')}>
                        Add Recipe
                    </button>
                    <Modal 
                        modalKeyword={this.state.modalKeyword}
                        show={this.state.show}
                        handleClose={this.hideModal}
                        idCounter={this.state.idCounter}
                    />
                </div>
            </div>
        );
    }
};

function mapStateToProps({ recipes }) {
    return { recipes };
};

export default connect(mapStateToProps, { fetchRecipes, editRecipes })(App);
