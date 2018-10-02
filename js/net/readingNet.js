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
    let titleList = $('.archive-list').find('.recent-excerpts');
    let titles = [];
    for (let i = 0; i < titleList.length; i++) {
      let obj = {};
      obj.title = titleList.eq(i).find('h4').text();
      obj.des = titleList.eq(i).find('.sec_desc p').text();
      obj.image = titleList.eq(i).find('.sec_img a img').attr('src');
      obj.link = titleList.eq(i).find('.sec_img a').attr('href');
      titles.push(obj);
    }
    dispatch(updateReadingTitles(globalKey, data.key, titles));
    for (let i = 0; i<titles.length; i++){
      getTargetContent(i, globalKey, data.key, titles[i], dispatch);
    }
  }).
  catch((error) => {
    console.error(error);
  });
}

export function getTargetContent(index, globalKey, key, obj, dispatch) {
  fetch(obj.link).
  then((response) => {
    return response.text();
  }).
  then((text) => {
    //let $ = cio.load(text);
    const $ = cheerio.load(text);
    let content = $('.entry').html();
    dispatch(updateReadingContent(index, globalKey, key, obj.link, content));
  }).
  catch((error) => {
    console.error(error);
  });
}