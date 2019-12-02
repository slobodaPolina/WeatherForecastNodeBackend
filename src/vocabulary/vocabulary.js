import vocabulary from "./vocabulary.json"

export const getCityCodeByName = cityName => vocabulary[cityName.toLowerCase()];
export default getCityCodeByName;
