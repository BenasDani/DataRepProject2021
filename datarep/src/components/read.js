import React from "react";
import { Games } from "./games";
import axios from 'axios'

export class Read extends React.Component {

    //Binds events
    constructor(){
        super();
        this.ReloadPage=this.ReloadPage.bind(this);
    }

    state = {
        games: []
    }

    componentDidMount(){
        axios.get('http://localhost:4000/api/games')
        .then((response)=>{
            this.setState({ games: response.data})
        })
        .catch((error)=>{
            console.log(error)
        });
    }


    ReloadPage(){
        axios.get('http://localhost:4000/api/games')
        .then((response)=>{
            this.setState({ games: response.data})
        })
        .catch((error)=>{
            console.log(error)
        });
    }

    render() {
        return (
            <div>
                <h1>Game Library</h1>

                <br/>
                <br/>

                {/*Calls games.js */}
                <Games objectName={this.state.games} ReloadPage={this.ReloadPage}> </Games>
            </div>
        );
    }
}
