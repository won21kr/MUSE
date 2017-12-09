
MEDIA_SPECS = [
    {  type: 'MediaSequence', defaultDuration: 1,
       records: [
           /*
          { duration: 4,
              mainScreen:  {url: 'assets/images/MuseTalk/Slide1.PNG'},
              leftScreen:  {url: 'assets/images/MuseTalk/Slide1.PNG'},
              rightScreen: {url: 'assets/images/MuseTalk/Slide1.PNG'}
          },
          { duration: 4,
            mainScreen:  {url: 'assets/images/MuseTalk/Slide2.PNG'},
            leftScreen:  {url: 'assets/images/MuseTalk/Slide1.PNG'},
            rightScreen: {url: 'assets/images/MuseTalk/Slide1.PNG'}
          },
          { duration: 4,
            mainScreen:  {url: 'assets/images/MuseTalk/Slide3.PNG'},
            leftScreen:  {url: 'assets/images/MuseTalk/Slide2.PNG'},
            rightScreen: {url: 'assets/images/MuseTalk/Slide1.PNG'}
          },
          { duration: 4,
            mainScreen:  {url: 'assets/images/MuseTalk/Slide4.PNG'},
            leftScreen:  {url: 'assets/images/MuseTalk/Slide3.PNG'},
            rightScreen: {url: 'assets/images/MuseTalk/Slide1.PNG'}
          },
          */
          //{ duration: 29*60,  mainScreen: {url: 'assets/video/ClimateMusicProj-v7-HD.webm'}},
          { duration: 29*60,  mainScreen: {url: 'assets/video/CMP-no-overlay-720.webm'}},
          // { duration: 10,     mainScreen: {url: 'assets/video/GlobalWeather2013.webm'}},
           { duration: 60,     mainScreen: {url: 'assets/video/2006_co2_flow_1024x512.webm'}},
       ]
   },
   /*
   {  type: 'StageStream', stage: 'Main Stage',
      records: [
          { t: 100,   name: 'none'},
          { t: 200,   name: 'dancer'},
          { t: 300,   name: 'cmp'},
          { t: 1000,   name: 'dancer'}
      ]
   }
   */
];

MUSE.returnValue(MEDIA_SPECS);
