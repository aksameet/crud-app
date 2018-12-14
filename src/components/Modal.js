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
        const textareaStyles = `${touched && error ? "widget-display__content-new__alert" : ""}`;

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
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <label>Add a Recipe</label>
                <Field
                    label="Recipe"
                    name="recipe_name"
                    component={this.renderNameField}
                    placeholder="Recipe name"
                />
                <Field
                    label="Post Content"
                    name="recipe_ingredients"
                    component={this.renderIngredientsField}
                    rows="8" 
                    placeholder="Enter Ingredients, Separated, By Comma"
                />
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.recipe_name) {
        errors.title = "Enter a title";
    }
    if (!values.recipe_ingredients) {
        errors.categories = "Enter some categories";
    }

    return errors;
}

export default reduxForm({
    validate,
    form: "RecipeForm"
})(connect(null, { addRecipe })(Modal));