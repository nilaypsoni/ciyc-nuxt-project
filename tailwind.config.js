/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm__mobile: {'max':'480px'},
      md__mobile:{'max':'530px'},
      lg__mobile: {'max':'768px'},
      tablet: {'max':'992px'},
      md__laptop: {'max':'1100px'},
      lg__laptop:{'max':'1200px'},
      laptop: {'max':'1440px'},

      mobileS : '320px',
      mobile : '500px' ,
      tabletS : '768px',


    },
    backgroundColor:{
      'white' : '#fff',
      'transparent':'transparent',
      'site__orange' : '#E07A5F',
      'site__blue':'#456A87',
      'site__peach':'#F4F1DE',
      'site__light__peach':"#F6F5F0",
      'site__light__gray':"#F8F8F5",
      'site__light__green':'#81B29A',
      'hero__image__background':'rgba(74,74,74)',


    },
    colors: {
      'white':'#fff',
      'red':'rgba(255, 0, 0,0.7)',
      'primary__color':'#111111',
      'heading__color':'#E07A5F',
      'secondary__color':'#456A87',
      'third__color':"#81B29A",
      'fourth__color':"#797979",

      'border__color':'#CCCCCC',

      'input__color':"#999999",

      'icon__color':"#5C5C5C",

      'border__color__second':"#E5E5E5",
      'border__color__third':"#9F9F9F",
      'border__color__fourth':"#F6F5F0",
    },
    fontFamily: {
      base: ['Open Sans', 'sans-serif'],
      secondary : ['Merriweather','sans-serif'],

    },
    extend: {
      spacing: {
        'container':'60px',
        'container__mobile':'24px',
        'container__sm':'18rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      fontSize:{
        'heading':'60px',
        'heading__mobile':'32px'
      },
      width:{
        logo:'200px',

      },
      gridTemplateColumns:{
        //For Footer
        footerColumns:"2fr 1fr 1fr 1fr 2fr",
        //For Footer
        footerColumnsLaptop:"repeat(auto-fit,minmax(300px,1fr))",
        //For Footer
        footerColumnsMobile:"1fr",

        //For Event Cards
        card__columns:"repeat(auto-fill,minmax(420px,1fr))",
        mobile__card__columns:"repeat(auto-fit,minmax(200px,1fr))",

        //For Culture Cards
        culture__card__columns:"repeat(auto-fit,minmax(450px,1fr))",

        //Single Event Page Grid (4fr for left side and 3fr for right side)
        single__event__column : "4fr 3fr",

        //Search Event (Filter) Page Grid (4fr for left side and 3fr for right side)
        search__event__column : "2fr 5fr",
      },
      boxShadow:{
        primary__shadow:"0px 4px 4px rgba(17, 17, 17, 0.2)"
      }
    }
  },
  plugins: [],
}
