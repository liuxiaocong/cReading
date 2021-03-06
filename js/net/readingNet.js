import {
  LOAD_TARGET_READING_SIDE_SUCCESS,
  LOAD_TARGET_READING_SIDE_FAIL,
} from '../constant/index';
import {
  updateReadingTitles,
  updateReadingContent,
} from '../action/readingAction';

const cheerio = require('react-native-cheerio');

export function getTargetReadingSide(globalKey, data, dispatch) {
  fetch(data.url).
  then((response) => {
    return response.text();
  }).
  then((text) => {
    //let $ = cio.load(text);
    const $ = cheerio.load(text);
    const { selector, titleSelector, urlSelector, desSelector, imgSelector } = data.nav;
    let titleList = getValueFromSelectors($, selector);
    let titles = [];
    for (let i = 0; i < titleList.length; i++) {
      let obj = {};
      obj.title = getValueFromItemSelectors( titleList.eq(i), titleSelector).trim();
      obj.link = getValueFromItemSelectors( titleList.eq(i), urlSelector);
      obj.des = getValueFromItemSelectors( titleList.eq(i), desSelector).trim();
      obj.image = getValueFromItemSelectors( titleList.eq(i), imgSelector);
      titles.push(obj);
    }
    dispatch(updateReadingTitles(globalKey, data.key, titles));
    for (let i = 0; i < titles.length; i++) {
      getTargetContent(i, globalKey, data.key, titles[i], dispatch, data);
    }
  }).
  catch((error) => {
    console.error(error);
  });
}

export function getValueFromSelectors($, selectors) {
  let ret;
  for (let i = 0; i < selectors.length; i++) {
    if (i === 0) {
      if (selectors[i].type === 0){
        //normal
        ret = $(selectors[i].value);
      } else if (selectors[i].type === 1){
        ret = $(selectors[i].value).text();
      } else if (selectors[i].type === 2) {
        ret = ret.attr(selectors[i].value);
      } else if (selectors[i].type === 3) {
        ret = $(selectors[i].value).html();
      }
    } else {
      if (selectors[i].type === 0){
        //normal
        ret = ret.find(selectors[i].value);
      } else if (selectors[i].type === 1){
        ret = ret.find(selectors[i].value).text();
      } else if (selectors[i].type === 2){
        ret = ret.attr(selectors[i].value);
      } else if (selectors[i].type === 3) {
        ret = ret.find(selectors[i].value).html();
      }
    }
  }
  return ret;
}

export function getValueFromItemSelectors(item, selectors) {
  for (let i = 0; i < selectors.length; i++){
    if (selectors[i].type === 0) {
      //normal
      item = item.find(selectors[i].value);
    } else if (selectors[i].type === 1) {
      item = item.find(selectors[i].value).text();
    } else if (selectors[i].type === 2) {
      item = item.attr(selectors[i].value);
    } else if (selectors[i].type === 3) {
      item = item.find(selectors[i].value).html();
    }
  }
  return item;
}

export function getTargetContent(index, globalKey, key, obj, dispatch, data) {
  fetch(obj.link).
  then((response) => {
    return response.text();
  }).
  then((text) => {
    //let $ = cio.load(text);
    const $ = cheerio.load(text);
    const { selector } = data.content;
    let content = getValueFromSelectors($, selector);
    dispatch(updateReadingContent(index, globalKey, key, obj.link, content));
  }).
  catch((error) => {
    console.error(error);
  });
}