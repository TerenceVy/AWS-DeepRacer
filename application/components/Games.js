import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Image,
} from 'react-native';
import BaseService from '../service/base';
import Runs from './Runs';

const gameService = new BaseService('games');

export default class Games extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            games: [],
            images: {
                "DeepRacer": require('../assets/DeepRacer.png'),
                "NBA": require('../assets/NBA.png')
            }
        }
    }
    componentDidMount() {
        this.getData();

        this.props.navigation.addListener('didFocus', this.getData.bind(this));
    }

    getData() {
        gameService.getAll((error, response) => {
            if (!error) this.setState({ games: response.result.entities });
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content"
                    animated={true}
                    backgroundColor="#6a51ae"/>

                {this.state.games.map((game, i) =>
                    <TouchableOpacity
                        key={i}
                        onPress={() => this.props.navigation.navigate('Runs', { id: game._id })}>
                        <Image style={styles[game.name]} source={this.state.images[game.name]} />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
};
const styles = StyleSheet.create({
    DeepRacer: {
        width: 270,
        height: 270,
        marginTop: 110,
        marginBottom: 20,
    },
    NBA: {
        width: 250,
        height: 150,
        marginBottom: 150,
        marginTop: 30
    },
    container: {
        backgroundColor: '#272a30',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
    }
});
