const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title: String,
    tags: [String],
    summary: String,
    content: String,
    imageLink: String,
    cover: String,
    author:{type:Schema.Types.ObjectId, ref:'User'},
}, {
    timestamps: true,
});

const PostModel = model('Post', PostSchema);

module.exports = PostModel;