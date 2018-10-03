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

const _ = require('lodash');
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
  titleItem: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 0,
    paddingBottom: 15,
    backgroundColor: '#FFF',
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

class TitleList extends Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      globalKey: 'photo',
      key: 'foto',
    };
  }

  componentDidMount() {
    this.props.loadTargetReadingSide(
      'http://academy.fengniao.com/list_967.html');
    getTargetReadingSide(data.globalKey, data.list[0], this.props.dispatch);
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={ styles.titleItemWrap }
        onPress={ () => {
          console.log('on press');
          console.log()
          this.props.navigation.navigate('Content', { url: item.link, title: item.title, globalKey: this.state.globalKey, key: this.state.key })
        } }
      >
        <View style={ styles.titleItem }>
          <Image
            style={ styles.titleImage }
            source={ { uri: item.image } }
          />
          <View style={ styles.info }>
            <Text
              numberOfLines={ 3 }
              style={ styles.titleTitle }>{ item.title }</Text>
            <Text
              numberOfLines={ 3 }
              style={ styles.titleDes }>{ item.des }</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { reading } = this.props;
    const { globalKey, key } = this.state;
    //console.log(reading);
    let data = [];
    if (reading[globalKey]) {
      let targetData = _.find(reading[globalKey], { 'key': key });
      if (targetData) {
        data = targetData.titles;
      }
    }
    return (
      <View style={ styles.container }>
        <FlatList
          data={ data }
          renderItem={ this.renderItem }
          keyExtractor={ (item, index) => index + '' }
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TitleList);