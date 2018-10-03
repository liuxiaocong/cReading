import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  WebView,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import HTMLView from 'react-native-htmlview';
import { loadTargetReadingSide } from '../action/readingAction';
import { getTargetReadingSide } from '../net/readingNet';
import data from '../config/data';

const _ = require('lodash');
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    backgroundColor: '#FFF',
  },
  webView: {
    width: width,
    height: 300,
  },
  contentContainer: {},
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  left: {},
  leftText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#108ee9',
    width: 30,
    textAlign: 'center',
  },
  middle: {
    flexGrow: 1,
    marginLeft: 10,
    marginRight: 60,
  },
  right: {
    fontSize: 16,
    color: '#108ee9',
    width: 50,
    textAlign: 'center',
  },
  backImage: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
});

const webViewStyles = StyleSheet.create({
  img: {
    maxWidth: '100%',
  },
  p: {
    fontSize: 14,
  },
});

class Content extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('title', 'Have a nice day!'),
      headerStyle: { height: 60 },
      header: null,
    };
  };

  constructor(props) {
    super(props);
    const { navigation } = props;
    const url = navigation.getParam('url');
    const title = navigation.getParam('title');
    const globalKey = navigation.getParam('globalKey');
    const key = navigation.getParam('key');
    this.state = {
      url,
      title,
      globalKey,
      key,
    };
  }

  componentDidMount() {

  }

  render() {
    const { reading } = this.props;
    const { url, title, globalKey, key } = this.state;
    const targetItem = reading && reading[this.state.globalKey] &&
      _.find(reading[this.state.globalKey], { 'key': key });
    let targetContent = null;
    if (targetItem) {
      targetContent = _.find(targetItem.contents, { 'url': url });
    }
    let targetContentHtml = '';
    if (targetContent) {
      targetContentHtml = targetContent.content;
    }
    targetContentHtml = targetContentHtml.replace(/<script.*?>.*?<\/script>/ig,
      '');
    let wrapPre = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><style type="text/css">img { max-width: 100% !important;}  p { font-size: 14px !important;}</style></head><body>';
    let wrapNext = '</body></html>';
    //targetContentHtml = wrapPre + targetContentHtml + wrapNext;
    console.log(targetContentHtml);
    return (
      <View style={ styles.container }>
        <View style={ styles.header }>
          <TouchableOpacity
            style={ styles.left }
            onPress={ () => {
              this.props.navigation.goBack();
            } }
          >
            { /*<Text style={ styles.leftText }>{ '<' }</Text>*/ }
            <Image
              style={ styles.backImage }
              source={ require('./back.png') }
            />
          </TouchableOpacity>
          <Text numberOfLines={ 1 }
                style={ styles.middle }>{ this.state.title }</Text>
        </View>
        <ScrollView contentContainerStyle={ styles.contentContainer }>
          <HTMLView
            value={ targetContentHtml }
            stylesheet={ webViewStyles }
          />
        </ScrollView>
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
