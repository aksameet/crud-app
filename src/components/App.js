import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/index';
import Modal from './Modal';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            show: false,
        };
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ show: false });
    }

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
                    <button onClick={this.showModal}>
                        Add Recipe
                    </button>
                    <Modal 
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
