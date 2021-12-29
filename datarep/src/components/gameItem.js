import React from "react";
import Card from 'react-bootstrap/Card'
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

export class GameItem extends React.Component {


    //Binding events to "this" instance of the controls
    constructor(){
        super();
        this.deleteGame = this.deleteGame.bind(this);
        
    }

    deleteGame(e){

        //This prevents any button on the form being called multiple times unintentionally
        e.preventDefault();

        console.log("Delete: "+this.props.gameType._id);

        axios.delete('http://localhost:4000/api/games/'+this.props.gameType._id)
        .then(()=>{
            this.props.ReloadPage();
        })
        .catch();
        
    }

    render() {
        return (
            <div>
                {/* Data display structure */}
                <Card>
                    <Card.Header>{this.props.gameType.Game}</Card.Header>
                    <Card.Body>
                        <blockquote className="block content">
                            <img src={this.props.gameType.GameCover} width="200" height="200" ></img>

                            <footer className="blockquote footer">
                                <p>{this.props.gameType.PGRating}</p>
                                <p>{this.props.gameType.Genre}</p>
                            </footer>
                        </blockquote>
                    </Card.Body>

                    {/* Edit Button + URL*/}
                    <Link to={"/edit/"+ this.props.gameType._id} className="btn btn-primary">Edit</Link>

                    {/* Delete Button*/}
                    <Button variant="danger" onClick={this.deleteGame}>Delete</Button>
                </Card>
            </div>
        );
    }
}

