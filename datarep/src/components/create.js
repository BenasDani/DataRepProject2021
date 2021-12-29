import axios from "axios";
import React from "react";

export class Create extends React.Component {

    constructor() {
        super();

        //Binds events to this
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGame = this.onChangeGame.bind(this);
        this.onChangePGRating = this.onChangePGRating.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeGameCover = this.onChangeGameCover.bind(this);


        //holds data
        this.state = {
            Game: '',
            PGRating: '',
            Genre: '',
            GameCover: ''

        }
    }
    
    onSubmit(e) {
        e.preventDefault();
        alert("Game: " + this.state.Game + this.state.PGRating +this.state.Genre + this.state.GameCover)

        //Creating object which will pass info to server
        const newGame={
            Game: this.state.Game,
            PGRating: this.state.PGRating,
            Genre: this.state.Genre,
            GameCover: this.state.GameCover
        }
        //posts object to server
        axios.post('http://localhost:4000/api/games', newGame)
        .then((res)=>{
            console.log(res)
            console.log(newGame)
        })
        .catch((err)=>{
            console.log(err)
        });
    }

    
    //  Event adds inputted game name to the component
    onChangeGame(e) {
        this.setState({
            Game: e.target.value
        });
    }

    //  Event adds inputted PG Rating to the component
    onChangePGRating(e) {
        this.setState({
            PGRating: e.target.value
        });
    }
  
        //  Event adds inputted genre to the component
    onChangeGenre(e){
        this.setState({
            Genre: e.target.value
        });
    }
   
        //  Event adds inputted game cover to the component
    onChangeGameCover(e){
        this.setState({
            GameCover: e.target.value
        });
    }

    render() {
        return (
            <div className='App'>

                {/* Creating a form for adding a new game */}
                <form onSubmit={this.onSubmit}>

                    {/* Creating the input field for the game */}
                    <div className='form-group'>
                        <label>Add Game: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Game}
                            onChange={this.onChangeGame}></input>
                    </div>

                    {/* Creating the input field for the pg rating */}
                    <div className='form-group'>
                        <label>Add PGRating: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.PGRating}
                            onChange={this.onChangePGRating}></input>
                    </div>

                    {/* Creating the input field for the Genre */}
                    <div className='form-group'>
                        <label>Add Genre: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Genre}
                            onChange={this.onChangeGenre}></input>
                    </div>

                    

                    {/* Creating the input field for the GameCover */}
                    <div className='form-group'>
                        <label>Add the URL for the game cover </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.GameCover}
                            onChange={this.onChangeGameCover}></textarea>
                    </div>

                    {/* Creating the "Add Game" button */}
                    <div className='form-group'>
                        <input type='submit'
                            value='Add Game'
                            className='btn btn-outline-success'></input>
                            
                            
                    </div>


                </form>
            </div>
        );
    }
}

