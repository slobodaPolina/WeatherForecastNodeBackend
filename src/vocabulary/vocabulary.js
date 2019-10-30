import vocabulary from "./vocabulary.json"

export const getCityCodeByName = cityName => vocabulary[cityName];
export default getCityCodeByName;
