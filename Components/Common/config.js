const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true,
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true,
  },
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2,
  },
  {
    id: 'mode',
    title: 'Language',
    options: ['javascript', 'xml', 'markdown', 'php', 'python', 'ruby'],
    value: 'javascript',
  },
  {
    id: 'theme',
    title: 'Select themes',
    options: [
      'default',
      'zenburn',
      'solarized',
      'rubyblue',
      'paraiso-dark',
      'midnight',
      'material',
      'hopscotch',
      'twilight',
    ],
    value: 'zenburn',
  },
];

const defaultValues = {
  basic: `{
    "@context": "https://schema.org",
    "@type": "Place",
    "additionalType": "City",
    "alternateName": "THIS IS AN INITAL VALUE FROM CONFIG.JS FILE AND SHOULD BE OVERRIDDEN! YOU SHOULD NOT SEE THIS MESSAGE!",
    "name": "Reykjavík",
    "identifier": "https://gid.is/Place/Reykjavik",
    "description": "Capital of Iceland",
    "disambiguatingDescription": "Reykjavik, on the coast of Iceland, is the country's capital and largest city. It's home to the National and Saga museums, tracing Iceland’s Viking history. The striking concrete Hallgrimskirkja church and rotating Perlan glass dome offer sweeping views of the sea and nearby hills. Exemplifying the island’s volcanic activity is the geothermal Blue Lagoon spa, near the village of Grindavik. ",
    "population": 122853,
    "slogan": "THETTA red-ahst",
    "image": "https://expertvagabond.com/wp-content/uploads/reykjavik-things-to-do-blog.jpg",
    "logo": "https://reykjavik.is/sites/all/themes/reykjavik_theme/css/images/rvk_logo.png",
    "url": "https://reykjavik.is/",
    "sameAs": "https://reykjavikurborg.is/",
    "hasMap": "https://www.google.com/maps/place/Reykjav%C3%ADk/data=!4m2!3m1!1s0x48d674b9eedcedc3:0xec912ca230d26071?sa=X&ved=2ahUKEwiKu6OhoIntAhVDKBoKHZpnDgkQ8gEwAHoECAYQAQ",
    "smokingAllowed": "false",
    "tourBookingPage": "https://www.re.is/",
    "geo": {

      "address": {
        "@context": "https://schema.org",
        "@type": "PostalAddress",
        "email": "info@reykjavik.is",
        "faxNumber": "56464564-51641531681",
        "telephone": "555-64654",
        "addressCountry": "ISL",
        "addressLocality": "Reykjavik",
        "addressRegion": "RVK",
        "streetAddress": "Borgartún 12-14, 105 Reykjavik"
      },
      "latitude": "64.1466° N",
      "longitude": "21.9426° W",
      "elevation": "0m - 914m"
    },
    "event": [

      {
        "@type": "Event",
        "description": "Lorem ipsum dolor sit amet.",
        "about": [
          {
            "@type": "Event",
            "name": "Children"
          },
          {
            "@type": "Event",
            "name": "Family"
          },
          {
            "@type": "Event",
            "name": "Delightful"
          }
        ],
        "name": "Lorem ipsum dolor sit amet.",
        "startDate": "2020-12-11T12:00:00.000Z",
        "endDate": "2020-12-11T13:30:00.000Z"
      },
      {
        "@type": "Event",
        "description": "Lorem dolor ipsum amet sit amet. ",
        "about": [

          {
            "@type": "Event",
            "name": "Adult"
          },
          {
            "@type": "Event",
            "name": "Dark"
          }
        ],
        "name": "Lorem dolor ipsum amet sit amet.",
        "startDate": "2020-12-10T20:30:00.000Z",
        "endDate": "2020-12-10T22:30:00.000Z"
      }
    ]
  }`,
  javascript: `const component = {
    name: 'Isomorphic',
    author: 'RedQ Team',
    website: 'https://isomorphic.redq.io/'
};`,
  markdown: `# Isomorphic
###This is a RedQ Team production
[have a look](https://isomorphic.redq.io/)
  `,
  xml: `<isomprphic>
    <to>Tove</to>
    <name>Isomorphic</name>
    <author>RedQ Team</author>
    <website>isomorphic.redq.io</website>
</isomprphic>`,
  php: `<html>
 <head>
  <title> v</title>
 </head>
 <body>
 <h1>https://isomorphic.redq.io/</h1>
 <p>This is a RedQ Team production</p>
 <a href="https://isomorphic.redq.io/">visit ou site</a>
 </body>
</html>
`,
  python: `
print("Isomorphic")
print("This is a RedQ Team production")
print("visit us https://isomorphic.redq.io ")
`,
  ruby: `rint "Isomorphic"
print "This is a RedQ Team production"
print "visit us https://isomorphic.redq.io "
`,
};

export { switchOptions, selectOptions, defaultValues };
