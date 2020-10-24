class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // Obtain query object from query string
    const filterObj = { ...this.queryString };

    // Delete properties that not use for filter
    const excludedFields = ['start', 'sort', 'limit', 'fields'];
    excludedFields.forEach(el => delete filterObj[el]);

    // Apply price range filter if exists, supose the string is
    // in right format
    // ?price=10-50
    if (filterObj.price && filterObj.price.includes('-')) {
      if (filterObj.price[0] === '-') {
        // (?price=-50) Filter by price <= 50
        filterObj.price = {
          $lte: parseInt(filterObj.price.replace('-', ''), 10),
        };
      } else if (filterObj.price[filterObj.price.length - 1] === '-') {
        // (?price=50-) Filter by price >= 50
        filterObj.price = {
          $gte: parseInt(filterObj.price.replace('-', ''), 10),
        };
      } else {
        // (?price=50-100) Filter by 50 <= price <=100
        filterObj.price = {
          $gte: parseInt(
            filterObj.price.substring(0, filterObj.price.indexOf('-')),
            10
          ),
          $lte: parseInt(
            filterObj.price.substring(
              filterObj.price.indexOf('-') + 1,
              filterObj.price.length
            ),
            10
          ),
        };
      }
    }

    // Apply filter name, use regular expression from mongodb
    if (filterObj.name) {
      filterObj.name = { $regex: `^${filterObj.name}`, $options: 'i' };
    }

    // If there are "tags" in queryString (?tags=mobile,work),
    // make new valid mongodb search object, tags = { $all: ['mobile','work'] }
    if (filterObj.tags) {
      if (filterObj.tags === 'all') {
        delete filterObj.tags;
      } else {
        filterObj.tags = { $all: filterObj.tags.split(',') };
      }
    }

    this.query = this.query.find(filterObj);

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      // Order by one or more keys separated by commas,
      // replace commas with spaces, sort('name price')
      const sortBy = this.queryString.sort.split(',').join(' ');

      // Order with case insensitive
      this.query = this.query.collation({ locale: 'es' }).sort(sortBy);
    } else {
      // if no sort, then we apply sort by create date by default
      this.query = this.query.sort('createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      // return only the desired fields
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      // by default, return everything except __v field, use by moongose
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginate() {
    const start = this.queryString.start * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (start - 1) * limit;

    // start=1&limit=10, 1-10, page 1, 11-20, page 2 ...
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
