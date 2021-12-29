import axios from "axios";
import React from "react";

export class Edit extends React.Component {

    constructor() {
        super();

        //Binds events
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeGame = this.onChangeGame.bind(this);
        this.onChangePGRating = this.onChangePGRating.bind(this);
        this.onChangeGenre = this.onChangeGenre.bind(this);
        this.onChangeGameCover = this.onChangeGameCover.bind(this);


        //State holds data
        this.state = {
            Game: '',
            PGRating: '',
            Genre: '',
            GameCover: ''

        }
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        axios.get('http://localhost:4000/api/games/'+ this.props.match.params.id)
        .then(response =>{
            this.setState({
                _id:response.data._id,
                Game:response.data.Game,
                PGRating:response.data.PGRating,
                Genre: response.data.PGRating,
                GameCover: response.data.GameCover
            })
        })
        .catch((error)=>{
            console.log(error)
        });
    }


    //Stops butto from being called multiple times
    onSubmit(e) {
        e.preventDefault();
        alert("Game: " + this.state.Game + this.state.PGRating +this.state.Genre + this.state.GameCover)

        //Creating an object newGame
        const newGame={
            _id: this.state._id,
            Game: this.state.Game,
            PGRating: this.state.PGRating,
            Genre: this.state.Genre,
            GameCover: this.state.GameCover
        }
         //calls axios
        axios.put('http://localhost:4000/api/games/'+this.state._id, newGame)
        .then(res =>{
            console.log(res.data)
        })
        .catch();

    }

        //Event handles adding the game link to the state
    onChangeGame(e) {
        this.setState({
            Game: e.target.value
        });
    }
        //Event handles adding the games pg rating link to the state
    onChangePGRating(e) {
        this.setState({
            PGRating: e.target.value
        });
    }
        //Event handles adding the game genre link to the state
    onChangeGenre(e){
        this.setState({
            Genre: e.target.value
        });
    }
    
    //Event handles adding the game cover link to the state
    onChangeGameCover(e){
        this.setState({
            GameCover: e.target.value
        });
    }

    render() {
        return (
            <div className='App'>

                {/* Creating a form for adding a new song */}
                <form onSubmit={this.onSubmit}>

                    {/* Edit Game */}
                    <div className='form-group'>
                        <label>Edit Game Name: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Game}
                            onChange={this.onChangeGame}></input>
                    </div>

                    {/* Edit PG Rating */}
                    <div className='form-group'>
                        <label>Edit PG Rating: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.PGRating}
                            onChange={this.onChangePGRating}></input>
                    </div>

                    {/* Edit Genre */}
                    <div className='form-group'>
                        <label>Edit Genre: </label>
                        <input type='text'
                            className='form-control'
                            value={this.state.Genre}
                            onChange={this.onChangeGenre}></input>
                    </div>

                    {/* Edit Cover */}
                    <div className='form-group'>
                        <label>Edit Game Cover: </label>
                        <textarea type='text'
                            className='form-control'
                            value={this.state.GameCover}
                            onChange={this.onChangeGameCover}></textarea>
                    </div>

                    {/* Creating the "Edit Game" button */}
                    <div className='form-group'>
                        <input type='submit'
                            value='Edit game'
                            className='btn btn-outline-success'></input>
                            
                    </div>


                </form>
            </div>
        );
    }
}