export const geolocation = (field = null, action) => {
    switch (action.type) {
      case 'SET_GEOLOCATION':
         return action.city;
      default:
        return field;
   }
};
export default geolocation;
