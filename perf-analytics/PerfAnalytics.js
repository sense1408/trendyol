const HEADERS = {'Content-Type': 'application/json'}
const POST = 'POST';
const API_URL = 'http://localhost:5000';

window.onload = function(){
  setTimeout(function(){
    const { performance } = window;
    const perfTiming = performance.timing;
    const performanceEntries = performance.getEntriesByType('paint');
    const performanceEntryResources = performance.getEntriesByType('resource');
    const performanceEntryNavigations = performance.getEntriesByType('navigation');
    let fcpVal = 0;
    let ttfbVal = 0;
    let domLoadVal = 0;
    let windowLoadVal = 0;
    const createdAt = new Date().getTime();

    if(performanceEntries && performanceEntries.length > 1) {
      fcpVal = (performanceEntries[1].startTime).toFixed(2);
      ttfbVal = (perfTiming.responseStart - perfTiming.requestStart).toFixed(2);
      domLoadVal = (perfTiming.domComplete - perfTiming.domLoading).toFixed(2);
      windowLoadVal = (perfTiming.loadEventEnd - perfTiming.navigationStart).toFixed(2);
    }

    let body = [
      {
        url: window.location.href,
        analyticType: 'TTFB',
        time: ttfbVal,
        createdAt
      },
      {
        url: window.location.href,
        analyticType: 'FCP',
        time: fcpVal,
        createdAt
      },
      {
        url: window.location.href,
        analyticType: 'DOM_LOAD',
        time: domLoadVal,
        createdAt
      },
      {
        url: window.location.href,
        analyticType: 'WINDOW_LOAD',
        time: windowLoadVal,
        createdAt
      }
    ];

    console.log('TTFB (Server response time or Time to First Byte): ', (perfTiming.responseStart - perfTiming.requestStart).toFixed(2) + "ms");
    if(performanceEntries && performanceEntries.length > 1) {
      console.log('FCP: The time to ' + performanceEntries[1].name + " was " + (performanceEntries[1].startTime).toFixed(2) + "ms");
    }
    console.log('Dom Loading / Page Render Time: ', (perfTiming.domComplete - perfTiming.domLoading).toFixed(2) + "ms");
    console.log('Window Load / Total Page Load Time: ', (perfTiming.loadEventEnd - perfTiming.navigationStart).toFixed(2) + "ms");
    console.log('--------- Document, Image, Font, JS, and CSS StartTime and Duration --------');
    performanceEntryResources.forEach((e) => {
      body.push({
        url: e.name,
        analyticType: e.initiatorType,
        time: e.duration.toFixed(2),
        startTime: e.startTime.toFixed(2),
        createdAt
      })
      console.log(e.name + ':\nStart Time: ' + e.startTime.toFixed(2) + 'ms\nDuration:  ' + e.duration.toFixed(2) + 'ms');
    });
    performanceEntryNavigations.forEach((e) => {
      body.push({
        url: e.name,
        analyticType: e.initiatorType,
        time: e.duration.toFixed(2),
        startTime: e.startTime.toFixed(2),
        createdAt
      })
      console.log(e.name + ':\nStart Time: ' + e.startTime.toFixed(2) + 'ms\nDuration:  ' + e.duration.toFixed(2) + 'ms');
    });

    if(performanceEntries && performanceEntries.length > 1 ) {
      fetch(API_URL, {
        method: POST,
        headers: HEADERS,
        body: JSON.stringify(body),
      })
    }


  }, 0);
}
