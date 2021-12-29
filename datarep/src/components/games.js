import React from "react";
import { GameItem } from "./gameItem";

export class Games extends React.Component {
    render() {
        // genreates multiple components in json array
        return this.props.objectName.map((game)=>{

            return <GameItem gameType={game} ReloadPage={this.props.ReloadPage}></GameItem>
        })
     }
}
