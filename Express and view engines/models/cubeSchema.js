const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: { type: String,
        validate:{
            validator: function(v){
                return v.length >= 3 && v.length <= 15;
            }
        },
        message: 'Name must be between 3 and 15 chars long!'
    },
    description: { type: String,
        validate:{
            validator: function(v){
                return v.length >= 20 && v.length <= 300;
            }
        },
        message: 'Description must be between 20 and 300 chars long!'
    },
    imageUrl: { type: String,
    validate:{
        validator: function(v){
            return (v.startsWith('http://') || v.startsWith('https://')) && (v.endsWith('.jpg') || v.endsWith('.png'));
        }
    },
    message: 'Invalid url!',
    },
    difficulty: { type: Number, min: 1, max: 6} 
});

module.exports = mongoose.model('Cubic', schema);