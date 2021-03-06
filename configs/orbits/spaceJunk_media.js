var MEDIA_SPEC =
[
   {  type: "MediaSequence",
      records: [
          { mainScreen: {"url": "assets/images/SpaceDebrisTalk/Slide1.PNG"},
            leftScreen: {"url": "assets/images/SpaceDebrisTalk/Slide1.PNG"},
            controlScript: {"note": "This is a note", "n": 5},
            year: {text: 1969}
          },
          { mainScreen: { "url": "assets/images/SpaceDebrisTalk/Slide2.PNG"},
            leftScreen: { "url": "assets/images/SpaceDebrisTalk/Slide3.PNG"},
            controlScript: {"note": "This is a second note", "n": 25},
            year: { text: 1973}
          },
          { t: "1980-1-1",
            mainScreen: { "url": "assets/images/SpaceDebrisTalk/Slide3.PNG"}},
          { t: "1990-1-1",
            mainScreen: { "url": "assets/video/2006_co2_flow_1024x512.mp4"}},
          { t: "2000-1-1",
            mainScreen: { "url": "assets/images/SpaceDebrisTalk/Slide5.PNG"}},
          { t: "2010-1-1",
            mainScreen: { "url": "assets/images/SpaceDebrisTalk/Slide6.PNG"}}
    ]
   },
   //{ type: 'foo' }
]

MUSE.returnValue(MEDIA_SPEC);
