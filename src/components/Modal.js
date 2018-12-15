import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addRecipe } from '../actions/index';

class Modal extends Component {

    renderNameField(field) {
        const {label, input, placeholder, meta: { touched, error } } = field;
        const className = `${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input 
                    className="form-control" 
                    type="text" 
                    {...input} 
                    placeholder={placeholder}/>
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    renderIngredientsField(field) {

        const { label, input, rows, placeholder, meta : {touched, error} } = field;
        const textareaStyles = `${touched && error ? "customClass" : ""}`;

        return (
            <div>
                <label>{label}</label>
                <textarea
                    type="text"
                    className={textareaStyles}
                    {...input}
                    rows={rows}
                    placeholder={placeholder}
                    />
                <div className="text-danger">
                    {touched ? error : ''}
                </div>
            </div>
        )
    }

    onSubmit(values) {
        this.props.addRecipe(values, () => {
            // this.props.history.push("/");
        });
    }

    render() {
        const { handleSubmit, show, handleClose } = this.props;
        let modalClass = `Modal ${show ? 'active': null}`

        return (
            <div className={modalClass} >
                <form 
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    className="Modal--form">
                    <label>Add a Recipe</label>
                    <Field
                        label="Recipe"
                        name="recipe_name"
                        component={this.renderNameField}
                        placeholder="Recipe name"
                    />
                    <Field
                        label="Ingredients"
                        name="recipe_ingredients"
                        component={this.renderIngredientsField}
                        rows="8" 
                        placeholder="Enter Ingredients, Separated, By Comma"
                    />
                    <button 
                            type="submit" 
                            className="Modal--form_submit">
                        Add Recipe
                    </button>
                    <button 
                            type="submit" 
                            className="Modal--form_close"
                            onClick={handleClose}>
                        Close
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.recipe_name) {
        errors.recipe_name = "Enter a recipe";
    }
    if (!values.recipe_ingredients) {
        errors.recipe_ingredients = "Enter some categories";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "RecipeForm"
})(connect(null, { addRecipe })(Modal));