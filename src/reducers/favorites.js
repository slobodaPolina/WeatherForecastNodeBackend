export const favorites = (field = [], action) => {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return field.concat([action.city]);
        case 'REMOVE_FAVORITE':
            return field.filter(city => city.name !== action.cityName);
      default:
        return field;
   }
};

export default favorites;
