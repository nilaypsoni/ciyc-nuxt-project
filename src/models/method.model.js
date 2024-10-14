const getQuery=(key)=>{
    let urlParams = new URLSearchParams(window.location.search);
    // console.log(urlParams.has('yourParam')); // true
    // console.log(urlParams.get('yourParam')); // "MyParam"
   return urlParams.get(key)
}

const scroll=(id)=>{
    let element = document.getElementById(id)
    var headerOffset = 85;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition - headerOffset;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

const search = (arr,search='',key='name') => {
    if(!arr) return []
    let matchingStrings = [];
    arr.forEach((list) => {
      if (list[key].toLocaleLowerCase().search(search.toLocaleLowerCase()) > -1) {
        matchingStrings.push(list)
      }
    })
    return [...new Set(matchingStrings)]
}

const search3 = (fruits, match_with)=>{
  return fruits.filter((item)=>{
    const pattern = new RegExp(`^${match_with.toLowerCase()}`,"gi");
     return pattern.test(item.toLowerCase());
 })
 }

const search2 = (arr,search='') => {
  if(!arr) return []
  let matchingStrings = [];
  arr.forEach((list) => {
    if (list.toLocaleLowerCase().search(search.toLocaleLowerCase()) > -1) {
      matchingStrings.push(list)
    }
  })
  return [...new Set(matchingStrings)]
}

const htmllength=(s,l)=>{
  let value=''
  if(s&&s.length){
    value=s.length>l?s.slice(0,l-1)+'...':s
  }

  return value
}
  

const methodModel={getQuery,scroll,search,search2,search3,htmllength}
export default methodModel