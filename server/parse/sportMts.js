import tress  from 'tress';
import cheerio from 'cheerio';

import chrono from 'chrono-node';
import moment from 'moment';
import axios from 'axios';

import { saveEventItemToDB, convertMonths, formatDate } from './helpers';

const URL = 'http://sport.mts.by/master-klassy/minsk';

let results = [];
let pagesCount;


const q = tress((url, callback) => {

  axios.get(url)
    .then(data => {
        const $ = cheerio.load(data.data);

        // if main page
        if (url === 'http://sport.mts.by/master-klassy/minsk') {
          // console.log('main url', url);
          pagesCount = $('.page-container .tabs-general .events-list a').length;
          $('.page-container .tabs-general .events-list a').each((item, i) => {
            const link = $(i).attr('href');
            q.push(`http://sport.mts.by${link}`);
          });
          callback();
          return;
        }



        // if event's page
        // console.log('parsing', url);

        const page = '.wrapper';

        const title = $(page).find('.page-container h2').text();
        const html = $(page).find('.page-content').html();
        const originalLink = url.split(`.by`)[1];

        const dateBlock = $(page).find('.event-info__date').text();
        // console.log(dateBlock)

        const parsedDate = chrono.parse(convertMonths(dateBlock))[0].start.knownValues;
        // console.log(originalLink);
        // console.log(parsedDate);
        const { day, month } = parsedDate;
        const hour = chrono.parse(dateBlock.split('/')[1])[0].start.knownValues.hour;
        // console.log(hour);
        let year = moment().format('YYYY');
        const date = formatDate(year, month, day, hour);


        results.push({
          date: date,
          title: title,
          text: html,
          originalLink,
          source: 'sport.mts.by',
          status: 'active',
        });

        callback();
    })
    .catch(error => {
      callback();
      // console.log(error.data);
    })
}, 5);

q.drain = () => {
  // console.log('pages count', pagesCount);
  // console.log('results length', results.length);
  saveEventItemToDB(results);
  results = [];
  if (pagesCount === results.length) {
    // console.log(results);
  } else {
    // console.log('some error happened');
  }
}

const init = () => {
  q.push(URL);
}

export default { init };
