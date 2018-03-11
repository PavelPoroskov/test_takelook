
import { createSelector } from 'reselect'


function includesSubArr( arr, subArr ) {

  for (let j=0; j < subArr.length; j++) {
    if (! arr.includes(subArr[j]) ){
      return false;
    }
  }

  return true;
}

// function intersectsSubArr( arr, subArr ) {

//   for (let j=0; j < subArr.length; j++) {
//     if (arr.includes(subArr[j]) ){
//       return true;
//     }
//   }

//   return false;
// }

const selStudios = state => state.studios;
const selMinPrice = state => {
  if (state.filter && state.filter.pricerange 
    && state.filter.pricerange[0] !== undefined ) {
    return state.filter.pricerange[0];
  }else{
    return undefined;
  }  
};
const selMaxPrice = state => {
  if (state.filter && state.filter.pricerange 
    && state.filter.pricerange[1] !== undefined ) {
    return state.filter.pricerange[1];
  }else{
    return undefined;
  }  
};
const selTags = state => state.filter.tags;
const selSortedStudios = createSelector(
  selStudios,
  studios => studios.sort( (a,b) => a.price - b.price )
);
const selFilteredByTagsStep = createSelector(
  selSortedStudios,
  selTags,
  (studios, tags) => {
    if (!tags) {
      return studios;
    }

    return studios.filter( studio => includesSubArr( studio.params, tags ) );
  }
);
const selFilteredByPriceStep = createSelector(
  selFilteredByTagsStep,
  selMinPrice,
  selMaxPrice,
  (studios, minprice, maxprice) => {
    if (minprice === undefined || maxprice === undefined) {
      return studios;
    }

    return studios.filter( studio => 
      minprice <= studio.price && studio.price <= maxprice )
  }
);
const selFilteredStudios = selFilteredByPriceStep; 

const selLimits = createSelector(
  selSortedStudios,
  studios => {

    // let minprice = Math.min( ...studios.map( studio => studio.price ) );
    // let maxprice = Math.max( ...studios.map( studio => studio.price ) );
    // if (!maxprice) {
    //   minprice = 0;
    //   maxprice = 0;
    // }

    let minprice = 0;
    let maxprice = 0;
    if ( 0 < studios.length ) {
      minprice = studios[0].price;
      maxprice = studios[studios.length-1].price;
    }

    let obj = {};
    studios.forEach( o_studio => {
      o_studio.params.forEach( str_param => { 
        obj[str_param] = true 
      }) 
    });
    let params = Object.keys(obj).sort();

    return {
      pricerange:[minprice,maxprice],
      tags:params
    };
  }
);

export { selFilteredStudios, selLimits };
