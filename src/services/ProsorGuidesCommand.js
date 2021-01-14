const querystring = require('querystring');
const numeral = require('numeral');
const moment = require('moment');
const { getUrl } = require('../utils/getUrl');
const Service = require('../Service');

moment.locale('es');

const {
  config: { youtubeKey },
} = require('../config/index');

class ProsorGuides extends Service {
  constructor() {
    super();
    this.maxSearchCharacters = 200;
    this.command = '!prosor';
    this.prosorYoutubeChannelId = 'UCUhzcbraLcYQTd3ldHBVnWA';
    this.api = 'https://www.googleapis.com/youtube/v3';
    this.help =
      'Lista las últimas guías doteras de prosor. !prosor [nombre héroe]';
    this.getMessageStatisticsVideo = this.getMessageStatisticsVideo.bind(this);
  }

  async getMessageStatisticsVideo({ videoId }) {
    const query = querystring.stringify({
      key: youtubeKey,
      part: 'statistics',
      id: videoId,
    });
    const responseStatistics = await getUrl(`${this.api}/videos?${query}`);

    if (responseStatistics && responseStatistics.items.length) {
      const {
        statistics: { likeCount = 0, dislikeCount = 0, viewCount = 0 },
      } = responseStatistics.items[0];

      return { likeCount, dislikeCount, videoId, viewCount };
    } else {
      return { likeCount: 0, dislikeCount: 0, viewCount: 0, videoId };
    }
  }

  formatMessage({
    title,
    videoId,
    publishedAt,
    likeCount = 0,
    dislikeCount = 0,
    viewCount = 0,
  } = {}) {
    const shortDate = moment(publishedAt).format('D MMM YY');
    const likeCountFormatted = numeral(likeCount).format('0,0');
    const dislikeCountFormatted = numeral(dislikeCount).format('0,0');
    const viewCountFormatted = numeral(viewCount).format('0,0a');
    return [
      `· ${title}`,
      `📼 https://youtu.be/${videoId}`,
      `👁 ${viewCountFormatted} 🗓 ${shortDate} 👍 ${likeCountFormatted} 👎 ${dislikeCountFormatted} `,
    ].join('\n');
  }

  async getVideos(searchText) {
    const query = querystring.stringify({
      part: 'snippet',
      channelId: this.prosorYoutubeChannelId,
      order: 'date',
      q: searchText,
      key: youtubeKey,
      maxResults: 10,
    });

    const searchResource = `${this.api}/search?${query}`;
    const { items = [] } = await getUrl(searchResource);

    return items.map(this.mapVideos);
  }

  mapVideos({ id: { videoId }, snippet: { title, publishedAt } }) {
    return {
      videoId,
      title,
      publishedAt: moment(publishedAt),
    };
  }

  filterVideosByText(searchText) {
    const regex = new RegExp(
      `.*${searchText.replace(' ', '\\s{0,}')}.*`,
      'gmi'
    );
    return ({ title }) => regex.test(title);
  }

  mergeInfoVideoAndStatitics(video, statistics) {
    const mergedInfoVideoAndStatitics = [...video, ...statistics].reduce(
      (store, currentVideo) => {
        const storeVideo = store[currentVideo.videoId] || {};
        store[currentVideo.videoId] = { ...currentVideo, ...storeVideo };
        return store;
      },
      {}
    );

    return Object.entries(mergedInfoVideoAndStatitics).map(
      ([, video]) => video
    );
  }

  sortByDate(videoA, VideoB) {
    return VideoB.publishedAt - videoA.publishedAt;
  }

  getSearchLink(searchText) {
    const searchTextEncoded = encodeURIComponent(searchText);
    return `https://www.youtube.com/channel/${this.prosorYoutubeChannelId}/search?query=${searchTextEncoded}`;
  }

  async execute({ params, context, client }) {
    const { from } = context;
    const searchText = params.join(' ').substring(0, this.maxSearchCharacters);

    const videos = await this.getVideos(searchText);

    const videosFiltered = videos
      .filter(this.filterVideosByText(searchText))
      .sort(this.sortByDate)
      .slice(0, 3);

    if (!videosFiltered.length) {
      await client.sendText(
        from,
        `No se han encontrado videos de "${searchText}".`
      );
      return;
    }

    const statisticsPromises = videosFiltered.map(
      this.getMessageStatisticsVideo
    );

    const statisticsInfo = await Promise.all(statisticsPromises);

    const mergedInfoVideosStatistics = this.mergeInfoVideoAndStatitics(
      videosFiltered,
      statisticsInfo
    );

    const message = mergedInfoVideosStatistics.map(this.formatMessage);
    message.unshift(
      `Resultados ${searchText} ${String.fromCharCode('0x200B').repeat(2575)}`
    );
    message.push(`para más 👇👇👇\n${this.getSearchLink(searchText)}`);

    await client.sendText(from, message.join('\n\n'));
  }
}

module.exports = ProsorGuides;
