/**
 * Created by unsad on 2017/9/21.
 */
module.exports = {
  preserveWhitespace: false,
  esModule: true,
  transformAssetUrls: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href',
    object: 'data'
  }
};
