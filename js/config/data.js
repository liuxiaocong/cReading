// type -  0 : normal ， 1：text,  2: attr, 3: html
export default {
  globalKey: 'photo',
  name: '摄影',
  list: [
    {
      key: 'foto',
      title: 'FOTO',
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

    {
      key: 'photoworld',
      title: '摄影世界',
      url: 'http://www.photoworld.com.cn/tag/%E6%91%84%E5%BD%B1%E6%8A%80%E5%B7%A7',
      nav: {
        selector: [
          {
            type: 0,
            value: '#home-main article',
          }],
        titleSelector: [
          {
            type: 1,
            value: 'h3',
          }],
        urlSelector: [
          {
            type: 0,
            value: '.thumbnail a',
          },
          {
            type: 2,
            value: 'href',
          }],
        desSelector: [
          {
            type: 1,
            value: '.excerpt',
          }],
        imgSelector: [
          {
            type: 0,
            value: '.thumbnail img',
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
            value: '.single-content',
          },
        ],
      },
    }
  ],
};