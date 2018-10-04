// type -  0 : normal ， 1：text,  2: attr, 3: html
export default {
  globalKey: 'photo',
  name: '摄影',
  list: [
    {
      key: 'foto',
      name: 'FOTO',
      url: 'https://www.fotobeginner.com/category/skills/',
      nav: {
        selector: [
          {
            type: 0,
            value: '.archive-list',
          },
          {
            type: 0,
            value: '.recent-excerpts',
          }],
        titleSelector: [
          {
            type: 1,
            value: 'h4',
          }],
        urlSelector: [
          {
            type: 0,
            value: '.sec_img a',
          },
          {
            type: 2,
            value: 'href',
          }],
        desSelector: [
          {
            type: 1,
            value: '.sec_desc p',
          }],
        imgSelector: [
          {
            type: 0,
            value: '.sec_img a img',
          },
          {
            type: 2,
            value: 'src',
          }],
        contentUrlSelector: '',
      },
      content: {
        selector: [
          {
            type: 3,
            value: '.entry',
          },
        ],
      },
    },
  ],
};