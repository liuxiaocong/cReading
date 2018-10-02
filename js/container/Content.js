import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { loadTargetReadingSide } from '../action/readingAction';
import { getTargetReadingSide } from '../net/readingNet';
import data from '../config/data';
const _ = require('lodash');
const width = Dimensions.get('window').width;
const infoWidth = width - 30 - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#FF0',
  },
  titleItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 15,
    flex: 1,
  },
  titleTitle: {
    color: '#000',
    width: infoWidth,
  },
  titleImage: {
    width: 100,
    height: 80,
    marginRight: 10,
  },
  info: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  titleDes: {
    fontSize: 12,
    color: '#999',
    width: infoWidth,
    marginTop: 5,
  },
  titleItemWrap: {},
});

class Content extends Component {

  constructor(props) {
    super(props);
    this.state = {
      globalKey: 'photo',
      key: 'foto',
    };
  }

  componentDidMount() {

  }


  render() {
    const { reading } = this.props;
    const { globalKey, key } = this.state;
    return (
      <View styles={ styles.container }>
        <Text>Content</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    reading: state.readingStore.reading,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  dispatch,
  loadTargetReadingSide,
});

export default connect(mapStateToProps, mapDispatchToProps)(Content);