import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecipes } from '../actions/index';

class Modal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            recipe_name: '',
            recipe_ingredients: ''
        };
    };

    componentDidUpdate() {

        if (this.props.activeRecipe !== null) {
            const { id, recipe_name, recipe_ingredients } = this.props.activeRecipe;

            if ( this.state.id !== id ) {

                this.setState({
                    id: id,
                    recipe_name: recipe_name,
                    recipe_ingredients: recipe_ingredients
                })
            }
        }
    }

    onNameInputChange(event) {
        this.setState({ recipe_name: event.target.value });
    }
    onIngredientsInputChange(event) {
        this.setState({ recipe_ingredients: event.target.value });
    }

    onSubmit(event) {
        event.preventDefault();
    };

    handleAdd() {
        this.props.handleClose();
        const values = { 
            recipe_name: this.state.recipe_name, 
            recipe_ingredients: this.state.recipe_ingredients 
        };

        this.setState({ 
            id: this.state.id + 1,
        });

        localStorage.setItem(this.state.id, JSON.stringify(values));
        this.props.fetchRecipes();

        this.setState({ 
            id: this.props.recipe_id,
            recipe_name: '',
            recipe_ingredients: ''
        });
    }

    handleEdit() {

        this.props.handleClose();
        const values = { 
            recipe_name: this.state.recipe_name, 
            recipe_ingredients: this.state.recipe_ingredients 
        };

        localStorage.setItem(this.state.id, JSON.stringify(values));
        this.props.fetchRecipes();

        this.setState({
            id: '',
            recipe_name: '',
            recipe_ingredients: ''
        });
    }

    modalClosed() {
        this.props.handleClose();
        this.props.fetchRecipes();
        this.setState({ 
            id: '',
            recipe_name: '',
            recipe_ingredients: ''
        });
    }

    render() {
        const { modalKeyword, show } = this.props;
        let modalClass = `Modal ${show ? 'active': ''}`

        return (
            <div className={modalClass} >
                <form 
                    onSubmit={this.onSubmit.bind(this)}
                    className="Modal--form">
                    <div className="Modal--form-header">
                        <label className="Modal--form-header_label">{modalKeyword} a Recipe</label>
                        <span 
                            className="Modal--form-header_close"
                            onClick={ this.modalClosed.bind(this) }>
                        </span>
                    </div>
                    <div className="Modal--form-inputs">
                        <div className="Modal--form-inputs_container">
                            <label className="Modal--form-inputs_label">Recipe</label>
                            <input 
                                className="Modal--form-inputs_input"
                                type="text" 
                                placeholder="Recipe name"
                                value={this.state.recipe_name}
                                onChange={this.onNameInputChange.bind(this)}
                                />
                            <label className="Modal--form-inputs_label">Ingredients</label>
                            <textarea
                                type="text"
                                className="Modal--form-inputs_textarea"
                                rows="8"
                                placeholder="Enter Ingredients, Separated, By Comma"
                                value={this.state.recipe_ingredients}
                                onChange={this.onIngredientsInputChange.bind(this)}
                                />
                        </div>       
                    </div>
                    <div className="Modal--form-controls">
                        <button 
                                type="submit" 
                                className={`button--add ${modalKeyword}`}
                                onClick={ this.handleAdd.bind(this) }>
                            {modalKeyword} Recipe
                        </button>
                        <button 
                                type="submit" 
                                className={`button--edit ${modalKeyword}`}
                                onClick={ this.handleEdit.bind(this) }>
                            {modalKeyword} Recipe
                        </button>
                        <span 
                                className="button--normal"
                                onClick={ this.modalClosed.bind(this) }>
                            Close
                        </span>
                    </div>

                </form>
            </div>
        );
    };
};

function mapStateToProps({ activeRecipe }) {
    return { activeRecipe }
}

export default connect(mapStateToProps, { fetchRecipes })(Modal);