import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    ImageBackground
} from 'react-native';
import { ListItem } from 'react-native-elements';
import LeaderBoard from './LeaderBoard';
import RunService from "../service/runs";

const runService = new RunService();

export default class Runs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            runs: []
        }

    }
    componentDidMount() {
        this.getData();

        this.props.navigation.addListener('didFocus', this.getData.bind(this));
    }

    getData() {
        runService.getAll(this.props.navigation.getParam('id'), (error, response) => {
            if (!error) this.setState({ runs: response.result.entities });

            console.log(error);
        });
    }

    render() {
        return(
            <ImageBackground style={styles.container} source={require ('../assets/background.png')}>
                <ScrollView>
                {
                    this.state.runs.map((run, i) => (
                        <ListItem
                            containerStyle={{backgroundColor: '#272a30'}}
                            key={i}
                            title={run.name}
                            titleStyle={{color: 'white'}}
                            subtitleStyle={{color: 'white'}}
                            onPress={() => this.props.navigation.navigate('LeaderBoard', { modelId: run._id, id: this.props.navigation.getParam('id') })}
                        />
                    ))
                }

                </ScrollView>
            </ImageBackground>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
});

