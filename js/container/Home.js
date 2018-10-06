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
import { Tabs } from 'antd-mobile-rn';

const _ = require('lodash');
import TitleList from './TitleList';
import { loadTargetReadingSide } from '../action/readingAction';
import { getTargetReadingSide } from '../net/readingNet';
import data from '../config/data';

const width = Dimensions.get('window').width;
const infoWidth = width - 30 - 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#FFF',
  },
  tabs: {},
  tabText: {
    color: '#000',
  },
  titleContainer: {
    flex: 1,
    width: width,
    backgroundColor: '#F0F',
  },
});

class Home extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    const { reading } = this.props;
    const tabs = [];
    const list = data.list;
    //console.log(reading);
    for (let i = 0; i < list.length; i++) {
      tabs.push(list[i]);
    }

    const renderContent = (tab : any, index : any) => {
      return <View style={ styles.titleContainer }><TitleList tIndex={ index }/></View>;
    };

    return (
      <View style={ styles.container }>
        <Tabs tabs={ tabs } initialPage={ 0 }>
          { renderContent }
        </Tabs>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);