class ApiFeatures{
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }

    search(){
        const keyword = this.queryString.keyword ? {
            name: {
                $regex : this.queryString.keyword,
                $options: 'i'
            }
        } : {};
        
        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const newQuery = {...this.queryString};
        
        //removing field for generate category filter
        const removeField = ['keyword', 'page', 'limit'];
        
        removeField.forEach((field) => delete newQuery[field]);

        //filter price and ratings
        let queryAsString = JSON.stringify(newQuery);
        queryAsString = queryAsString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryAsString));
        return this;
    }

    pagination(resultPerPage){
        const currentPage = Number(this.queryString.page) || 1;

        const itemSkip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(itemSkip);

        return this;
    }

};


module.exports = ApiFeatures;