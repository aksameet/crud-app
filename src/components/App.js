import '../style/App.css';
import React, { Component } from "react";
import { connect } from "react-redux";
import { addRecipe } from "../actions/index";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };

        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(event) {
        this.setState({ term: event.target.value });
    }

    onFormSubmit(event) {
        event.preventDefault();

        this.props.addRecipe(this.state.term);
        this.setState({ term: "" });
    }
    
    renderList() {
        console.log(this.props.recipes);

        if (this.props.recipes) {
            return this.props.recipes.map(recipe => {
                return (
                    <li
                        key={recipe}
                        // onClick={() => this.props.addRecipe(recipe)}
                        className="recipes--list_item"
                    >
                        {recipe}
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
                    <form onSubmit={this.onFormSubmit} className="input-group">
                        <input
                            placeholder="Add Recipe"
                            className="form-control"
                            value={this.state.term}
                            onChange={this.onInputChange}
                        />
                        <span className="recipes--list__button-wrapper">
                            <button type="submit" className="recipes--list__button">Add Recipe</button>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ recipes }) {
    return { recipes };
}

export default connect(mapStateToProps, {addRecipe})(App);
