import {
  LOAD_TARGET_READING_SIDE,
  UPDATE_READING_TITLES,
  UPDATE_READING_CONTENT,
} from '../constant/index';

export function loadTargetReadingSide(url) {
  return {
    type: LOAD_TARGET_READING_SIDE,
    payload: {
      request: {
        url: url,
      },
    },
  };
}

export function updateReadingTitles(globalKey, key, titles) {
  return {
    type: UPDATE_READING_TITLES,
    globalKey,
    key,
    titles,
  };
}

export function updateReadingContent(index, globalKey, key, url, content) {
  return {
    type: UPDATE_READING_CONTENT,
    index,
    globalKey,
    key,
    url,
    content,
  };
}