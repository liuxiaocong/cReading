const _ = require('lodash');
import {
  LOAD_TARGET_READING_SIDE,
  LOAD_TARGET_READING_SIDE_SUCCESS,
  LOAD_TARGET_READING_SIDE_FAIL,
  UPDATE_READING_TITLES,
  UPDATE_READING_CONTENT,
} from '../constant/index';

const initialState = {
  reading: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TARGET_READING_SIDE:
      return {
        ...state,
        loading: true,
      };
    case LOAD_TARGET_READING_SIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        reading: state.reading.push(action.text),
      };
    case LOAD_TARGET_READING_SIDE_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories',
      };
    case UPDATE_READING_TITLES: {
      const reading = Object.assign({}, state.reading);
      const globalKey = action.globalKey;
      if (!reading[globalKey]) {
        reading[globalKey] = [];
      }
      let target = _.find(reading[globalKey], { 'key': action.key });
      let needAdd = false;
      if (!target) {
        target = { key: action.key };
        needAdd = true;
      }
      target.titles = action.titles;
      if (needAdd) {
        reading[globalKey].push(target);
      }
      return {
        ...state,
        loading: false,
        reading: reading,
      };
    }
    case UPDATE_READING_CONTENT: {
      const reading = Object.assign({}, state.reading);
      const globalKey = action.globalKey;
      if (!reading[globalKey]) {
        reading[globalKey] = [];
      }
      let target = _.find(reading[globalKey], { 'key': action.key });
      let needAdd = false;
      if (!target) {
        target = { key: action.key };
        needAdd = true;
      }
      if (!target.contents) {
        target.contents = [];
      }
      target.contents[action.index] = {
        url: action.url,
        content: action.content,
      };
      if (needAdd) {
        reading[globalKey].push(target);
      }
      return {
        ...state,
        loading: false,
        reading: reading,
      };
    }
    default:
      return state;
  }
}