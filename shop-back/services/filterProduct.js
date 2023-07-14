class filters {
  static filter = (search, minPrice, maxPrice) => {
    let where = {
      // status: 'active'
    };

    if (search && minPrice && maxPrice) {
      where.$and = [
        { price: { $gte: minPrice } },
        { price: { $lte: maxPrice } },
        { name: { $like: `%${search}%` } },
      ];
    } else if (search && minPrice) {
      where.$and = [
        { name: { $like: `%${search}%` } },
        { price: { $gte: minPrice } },
      ];
    } else if (search && maxPrice) {
      where.$and = [
        { name: { $like: `%${search}%` } },
        { price: { $lte: maxPrice } },
      ];
    } else if (maxPrice && minPrice) {
      where.$and = [
        { price: { $lte: maxPrice } },
        { price: { $gte: minPrice } },
      ];
    } else if (search) {
      where = { name: { $like: `%${search}%` } };
    } else if (minPrice) {
      where = { price: { $gte: minPrice } };
    } else if (maxPrice) {
      where = { price: { $lte: maxPrice } };
    }

    return where;
  };
}
export default filters;
