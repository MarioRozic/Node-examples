let mongoose = require('mongoose');
let Schema = mongoose.Schema;


let BookSchema = new Schema({
    title: { type: String, required: true},
    author: { type: String, required: true},
    year: { type: Number, required: true},
    pages: { type: Number, required: true, min: 1},
    createdAt: { type: Date, default: Date.now},
},{
    vesrionKey: false
}
);

BookSchema.pre('save', next => {
    now = new Date();
    if(!this.createdAt) {
        this.createdAt= now;
    }

    next();
});

// exports the bookschema for use elsewhere

module.exports = mongoose.model('book', BookSchema);
