import React from 'react';
import Leaderboard from 'react-native-leaderboard';
import RankingService from "../service/ranking";
import { StyleSheet, ImageBackground } from "react-native";

const rankingService = new RankingService();

export default class LeaderBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ranking: []
        }
    }

    componentDidMount() {
        this.getData();

        this.props.navigation.addListener('didFocus', this.getData.bind(this));
    }

    getData() {
        this.setState({ ranking: [] });
        console.log(this.props.navigation.getParam('id'), this.props.navigation.getParam('modelId'));
        rankingService.getAll(this.props.navigation.getParam('id'), this.props.navigation.getParam('modelId'), (error,response) => {
            if (!error) {
                
                this.setState({ ranking: response.result.entities });
            }

            console.log(response.result.entities)
        });
    }

    render() {
        return (
            <ImageBackground style={styles.container} source={require('../assets/background.png')}>
            <Leaderboard
                data={this.state.ranking}
                sortBy='time'
                labelBy='name'/>
            </ImageBackground>
        )
    }

};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});


