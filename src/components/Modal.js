import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { addRecipe } from '../actions/index';

class Modal extends Component {

    renderNameField(field) {
        const {label, input, placeholder, meta: { touched, error } } = field;
        const className = `Modal--form-inputs_container ${touched && error ? "error" : ""}`;

        return (
            <div className={className}>
                <label className="Modal--form-inputs_label">{label}</label>
                <input 
                    className="Modal--form-inputs_input"
                    type="text" 
                    {...input} 
                    placeholder={placeholder}/>
                <div className="error-text">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }

    renderIngredientsField(field) {

        const { label, input, rows, placeholder, meta : {touched, error} } = field;
        const className = `Modal--form-inputs_container ${touched && error ? "error" : ""}`;

        return (
            <div className={className}>
                <label className="Modal--form-inputs_label">{label}</label>
                <textarea
                    type="text"
                    className="Modal--form-inputs_textarea"
                    {...input}
                    rows={rows}
                    placeholder={placeholder}
                    />
                <div className="error-text">
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
        const { modalKeyword, handleSubmit, show, handleClose } = this.props;
        let modalClass = `Modal ${show ? 'active': ''}`

        return (
            <div className={modalClass} >
                <form 
                    onSubmit={handleSubmit(this.onSubmit.bind(this))}
                    className="Modal--form">
                    <div className="Modal--form-header">
                        <label className="Modal--form-header_label">{modalKeyword} a Recipe</label>
                        <span 
                            className="Modal--form-header_close"
                            onClick={ handleClose }
                        ></span>
                    </div>
                    <div className="Modal--form-inputs">
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
                    </div>
                    <div className="Modal--form-controls">
                        <button 
                                type="submit" 
                                className="button--add"
                                onClick={ handleClose }>
                            Add Recipe
                        </button>
                        <span 
                                className="button--normal"
                                onClick={ handleClose }>
                            Close
                        </span>
                    </div>

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