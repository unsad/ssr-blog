<template>
  <div
    class="aplayer"
    :class="{
      'aplayer-narrow': isMiniMode,
      'aplayer-withlist' : !isMiniMode && musicList.length > 0,
      'aplayer-withlrc': !isMiniMode && (!!$slots.display || shouldShowLrc),
      'aplayer-float': isFloatMode
    }"
    :style="floatStyleObj"
  >
    <div class="aplayer-body">
      <thumbnail class="aplayer-thumbnail"
        :pic="currentMusic.pic"
        :playing="isPlaying"
        :enable-drag="isFloatMode"
        @toggleplay="toggle"
        @dragbegin="onDragBegin"
        @dragging="onDragAround"
      />
      <div class="aplayer-info no-phone">
        <div class="aplayer-music">
          <span class="aplayer-title">{{ currentMusic.title }}</span>
          <span class="aplayer-author">{{ currentMusic.author }}</span>
        </div>
        <slot name="display" :current-music="currentMusic" :play-stat="playStat">
          <lyrics :current-music="currentMusic" :play-stat="playStat" v-if="shouldShowLrc"/>
        </slot>
        <controls
          :mode="playMode"
          :stat="playStat"
          :volume="volume"
          :muted="muted"
          :theme="currentTheme"
          @togglelist="showList = !showList"
          @togglemute="toggleMute"
          @setvolume="setAudioVolume"
          @setprogress="setProgress"
          @dragbegin="onProgressDragBegin"
          @dragend="onProgressDragEnd"
          @dragging="onProgressDragging"
          @nextmode="setNextMode"
        />
      </div>
    </div>
    <audio ref="audio"></audio>
    <music-list
      :show="showList && !isMiniMode"
      :current-music="currentMusic"
      :music-list="musicList"
      :play-index="playIndex"
      :listmaxheight="listMaxHeight"
      :theme="currentTheme"
      @selectsong="onSelectSong"
    />
  </div>
</template>
<script lang="ts">
  import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
  import Thumbnail from './part/aplayer-thumbnail.vue';
  import MusicList from './part/aplayer-list.vue';
  import Controls from './part/aplayer-controller.vue';
  import Lyrics from './part/aplayer-lrc.vue';
  import {
    deprecatedProp,
    versionCompare,
    warn
  } from './utils.js';

  const canUseSync = versionCompare(Vue.version, '2.3.0') >= 0;

  const picThemeCache = {};

  let activeMutex = null;

  @Component({
    components: {
      Thumbnail,
      Controls,
      MusicList,
      Lyrics
    }
  })
export default class Player extends Vue {
  @Prop({
    required: true,
    validator (value) {
      let song = value;
      if (!song.url || !song.title || !song.author) {
        song.title = song.title || 'Untitled';
        song.author = song.author || 'Unknown';
        return false;
      }
      return true;
    }
  })
  music: Object

  @Prop({
    default() {
      return [];
    },
    validator (value) {
      let songs = value;
      let valid = true;
      for (let i = 0; i < songs.length; i++) {
        let song = songs[i];
        if (!song.url || !song.title || !song.author) {
          song.title = song.title || 'Untitled';
          song.author = song.author || 'Unknown';
          valid = false;
        }
      }
      return valid;
    }
  })
  list: Array

  @Prop({default: false})
  mini: boolean

  @Prop({default: false})
  showLrc: boolean

  @Prop({default: true})
  mutex: boolean

  @Prop({default: '#41b883'})
  theme: string
  
  @Prop({default: 'circulation'})
  mode: string

  @Prop({default: 'auto'})
  preload: 'auto'

  @Prop()
  listMaxHeight: string

  @Prop({default: false})
  float: boolean

  // Audio attributes as props
  // autoplay controls muted preload volume
  // muted and volume are observable
  @Prop({default: false})
  autoplay: boolean

  /**
   * whether to show native audio controls below Vue-APlayer
   * only work in development environment and not mini mode
   */
  @Prop({default: false})
  controls: boolean
   
  internalMusic = this.music;
  internalMode = this.mode;
  isPlaying = false;
  isSeeking = false;
  wasPlayingBeforeSeeking = false;
  isMobile = /mobile/i.test(window.navigator.userAgent);
  playStat = {
    duration: 0,
    loadedTime: 0,
    playedTime: 0
  };
  volume = 0.8;
  muted = false;
  showList = false;
  // handle Promise returned from audio.play()
  // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
  audioPlayPromise = Promise.resolve();
  floatOriginX = 0;
  floatOriginY = 0;
  floatOffsetLeft = 0;
  floatOffsetTop = 0;
  selfAdaptingThem = null;
  
  // alias for $refs.audio
  get audio () {
    return this.$refs.audio;
  }

  get currentMusic () {
    return this.internalMusic;
  }

  // compatible for deprecated props
  get isMiniMode () {
    return this.mini || this.narrow;
  }

  get shouldShowLrc () {
    return this.showLrc || this.showlrc;
  }

  // prop wrappers
  get currentTheme () {
    return this.selfAdaptingTheme || this.currentMusic.theme || this.theme;
  }

  get isFloatMode () {
    return this.float && !this.isMobile;
  }

  get floatStyleObj () {
    // transform: translate(floatOffsetLeft, floatOffsetY)
    return {
      transform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`,
      webkitTransform: `translate(${this.floatOffsetLeft}px, ${this.floatOffsetTop}px)`
    };
  }

  get shouldAutoplay () {
    if (this.isMobile) return false;
    return this.autoplay;
  }

  get playMode () {
    return this.internalMode;
  }

  get musicList () {
    return this.list;
  }

  get shouldShowNativeControls () {
    return process.env.NODE_ENV !== 'production' &&
      this.controls &&
      !this.isMiniMode;
  }

  // useful
  get currentPicStyleObj () {
    if (this.currentMusic && this.currentMusic.pic) {
      return {
        backgroundImage: `url(${this.currentMusic.pic})`
      };
    }
    return {};
  }

  get loadProgress () {
    if (this.playStat.duration === 0) return 0;
    return this.playStat.loadedTime / this.playStat.duration;
  }

  get playProgress () {
    if (this.playStat.duration === 0) return 0;
    return this.playStat.playedTime / this.playStat.duration;
  }

  get playIndex() {
      return this.musicList.indexOf(this.currentMusic);
  }

  set playIndex(val) {
    this.setCurrentMusic(this.musicList[val]);
  }

  onDragBegin () {
    this.floatOriginX = this.floatOffsetLeft;
    this.floatOriginY = this.floatOffsetTop;
  }
  onDragAround ({offsetLeft, offsetTop}) {
    this.floatOffsetLeft = this.floatOriginX + offsetLeft;
    this.floatOffsetTop = this.floatOriginY + offsetTop;
  }
  setCurrentMusic (music) {
    canUseSync && this.$emit('update:music', music);
    this.internalMusic = music;
  }
  setPlayMode (mode) {
    canUseSync && this.$emit('update:mode', mode);
    this.internalMode = mode;
  }
  toggle () {
    if (!this.audio.paused) {
      this.pause();
    } else {
      this.play();
    }
  }
  play () {
    if (this.mutex) {
      if (activeMutex && activeMutex !== this) {
        activeMutex.pause();
      }
      activeMutex = this;
    }
    // handle .play() Promise
    const audioPlayPromise = this.audio.play();
    if (audioPlayPromise) {
      this.audioPlayPromise = new Promise((resolve, reject) => {
        // rejectPlayPromise is to force reject audioPlayPromise if it's still pending when pause() is called
        this.rejectPlayPromise = reject;
        audioPlayPromise.then((res) => {
          this.rejectPlayPromise = null;
          resolve(res);
        }).catch(warn);
      });
      return this.autoPlayPromise;
    }
  }
  pause () {
    this.audioPlayPromise
    // Avoid force rejection throws Uncaught
      .catch(() => {
      })
      .finally(() => {
        this.audio.pause();
      });
    // audioPlayPromise is still pending
    if (this.rejectPlayPromise) {
      // force reject playPromise
      this.rejectPlayPromise();
      this.rejectPlayPromise = null;
    }
  }
  thenPlay () {
    this.$nextTick(() => {
      this.play();
    });
  }
  onSelectSong (song) {
    if (this.currentMusic === song) {
      this.toggle();
    } else {
      this.setCurrentMusic(song);
      this.thenPlay();
    }
  }
  toggleMute () {
    this.setAudioMuted(!this.audio.muted);
  }
  setAudioMuted (val) {
    this.audio.muted = val;
    this.muted = this.audio.muted;
  }
  setAudioVolume (val) {
    this.audio.volume = val;
    if (val > 0) {
      this.setAudioMuted(false);
    }
  }
  setProgress (val) {
    if (isNaN(this.audio.duration)) {
      this.playStat.playedTime = 0;
    } else {
      this.audio.currentTime = this.audio.duration * val;
    }
  }
  onProgressDragBegin (val) {
    this.wasPlayingBeforeSeeking = this.isPlaying;
    this.pause();
    this.isSeeking = true;
    this.audio.currentTime = this.audio.duration * val;
  }
  onProgressDragging (val) {
    if (isNaN(this.audio.duration)) {
      this.playStat.playedTime = 0;
    } else {
      this.audio.currentTime = this.audio.duration * val;
    }
  }
  onProgressDragEnd (val) {
    this.isSeeking = false;
    if (this.wasPlayingBeforeSeeking) {
      this.thenPlay();
    }
  }
  setNextMode () {
    if (this.musicList.length) {
      if (this.playMode === 'random') {
        this.setPlayMode('single');
      } else if (this.playMode === 'single') {
        this.setPlayMode('order');
      } else if (this.playMode === 'order') {
        this.setPlayMode('circulation');
      } else if (this.playMode === 'circulation') {
        this.setPlayMode('random');
      }
    } else {
      if (this.playMode === 'circulation') {
        this.setPlayMode('order');
      } else {
        this.setPlayMode('circulation');
      }
    }
  }
  onAudioPlay () {
    this.isPlaying = true;
    this.$emit('play');
  }
  onAudioPause () {
    this.isPlaying = false;
    this.$emit('pause');
  }
  onAudioDurationChange () {
    if (this.audio.duration !== 1) {
      this.playStat.duration = this.audio.duration;
    }
  }
  onAudioProgress () {
    if (this.audio.buffered.length) {
      this.playStat.loadedTime = this.audio.buffered.end(this.audio.buffered.length - 1);
    } else {
      this.playStat.loadedTime = 0;
    }
  }
  onAudioTimeUpdate () {
    this.playStat.playedTime = this.audio.currentTime;
  }
  onAudioSeeking () {
    this.playStat.playedTime = this.audio.currentTime;
  }
  onAudioSeeked () {
    this.playStat.playedTime = this.audio.currentTime;
  }
  onAudioVolumeChange () {
    this.volume = this.audio.volume;
    this.muted = this.audio.muted;
  }
  onAudioEnded () {
    // if (!this.musicList.includes(this.currentMusic)) {
    if (this.playIndex === -1) {
      // if music list doesn't contain current music
      // and should play next song according to `mode`
      // set playIndex 0
      // switch (this.mode) {
      //   case 'order':
      //   case 'circulation':
      //   case 'random':
      //     this.playIndex = 0
      //     this.thenPlay()
      //     break;
      //   default:
      //     break;
      // }
    } else {
      if (this.mode === 'order') {
        if (this.playIndex === this.musicList.length - 1) {
          // do nothing
        } else if (this.playIndex < this.musicList.length - 1) {
          this.playIndex++;
          this.thenPlay();
        }
      } else if (this.mode === 'single') {
        this.thenPlay();
      } else if (this.mode === 'circulation') {
        this.playIndex = (this.playIndex + 1) % this.musicList.length;
        this.thenPlay();
      } else if (this.mode === 'random') {
        this.playIndex = Math.trunc(Math.random() * this.musicList.length);
        this.thenPlay();
      }
    }
    this.$emit('ended');
  }
  setupAudio () {
    this.audio.controls = this.shouldShowNativeControls;
    this.muted = this.audio.muted;
    // there's no point making preload configurable
    this.audio.preload = true; // this.preload
    this.audio.addEventListener('play', this.onAudioPlay);
    this.audio.addEventListener('pause', this.onAudioPause);
    this.audio.addEventListener('abort', this.onAudioPause);
    this.audio.addEventListener('progress', this.onAudioProgress);
    this.audio.addEventListener('durationchange', this.onAudioDurationChange);
    this.audio.addEventListener('timeupdate', this.onAudioTimeUpdate);
    this.audio.addEventListener('volumechange', this.onAudioVolumeChange);
    this.audio.addEventListener('seeking', this.onAudioSeeking);
    this.audio.addEventListener('seeked', this.onAudioSeeked);
    this.audio.addEventListener('ended', this.onAudioEnded);
    if (this.currentMusic) {
      this.audio.src = this.currentMusic.url;
    }
  }
  setSelfAdaptingTheme () {
    // auto theme according to current music cover image
    if ((this.currentMusic.theme || this.theme) === 'pic') {
      const pic = this.currentMusic.pic;
      // use cache
      if (picThemeCache[pic]) {
        this.selfAdaptingTheme = picThemeCache[pic];
      } else {
        try {
          new ColorThief().getColorAsync(pic, ([r, g, b]) => {
            picThemeCache[pic] = `rgb(${r}, ${g}, ${b})`;
            this.selfAdaptingTheme = `rgb(${r}, ${g}, ${b})`;
          });
        } catch (e) {
          warn('color-thief is required to support self-adapting theme');
        }
      }
    } else {
      this.selfAdaptingTheme = null;
    }
  }

  mounted() {
    this.setupAudio();
    this.setSelfAdaptingTheme();
    if (this.autoplay) this.play();
  }

  beforeDestroy() {
    if (activeMutex === this) {
      activeMutex = null;
    }
    if (this.hls) {
      this.hls.destroy();
    }
  }

  @Watch('music')
  onMusicChanged(music) {
    this.internalMusic = music;
  }

  @Watch('shouldShowNativeControls')
  onControlsChanged(val) {
    this.audio.controls = val;
  }

  @Watch('currentMusic')
  onCurrentMusicChanged(music) {
    // HLS support
    if (/\.m3u8(?=(#|\?|$))/.test(music.url)) {
      if (this.audio.canPlayType('application/x-mpegURL') || this.audio.canPlayType('application/vnd.apple.mpegURL')) {
        this.audio.src = music.url;
      } else {
        try {
          const Hls = require('hls.js');
          if (Hls.isSupported()) {
            if (!this.hls) {
              this.hls = new Hls();
            }
            this.hls.loadSource(music.url);
            this.hls.attachMedia(this.audio);
          } else {
            warn('HLS is not supported on your browser');
            this.audio.src = music.url;
          }
        } catch (e) {
          warn('hls.js is required to support m3u8');
          this.audio.src = music.url;
        }
      }
    } else {
      this.audio.src = music.url;
    }
    // self-adapting theme color
    this.setSelfAdaptingTheme();
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .aplayer 
    position: fixed
    right: 3%
    z-index: 2
    overflow: hidden
    user-select: none
    .aplayer-lrc-content 
      display: none
    .aplayer-body 
      display: flex
      position: relative
      .aplayer-thumbnail
        position: relative
      .aplayer-info 
        flex-grow: 1
        display: flex
        flex-direction: column
        padding: 1.5rem 0
        .aplayer-music 
          flex-grow: 1
          background: #000
          color: #fff
          overflow: hidden
          white-space: nowrap
          text-overflow: ellipsis
          border: 2px solid #fff
          user-select: text
          margin-left: -1rem
          padding-left: 1rem
          z-index: -1
          cursor: default
          padding-bottom: 2px
          .aplayer-title 
            font-size: 1.2rem      
          .aplayer-author 
            margin-left: .5rem
            color: #666       
    audio[controls] 
      display: block
      width: 100%

  @keyframes aplayer-roll 
    0% 
      left: 0 
    100% 
      left: -100%
@media only screen and (min-width: 769px)
  .aplayer 
    top: 1rem
@media only screen and (max-width: 768px)
  .aplayer 
    bottom: 5rem
</style>

