const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add a email'],
      unique: true,
      trim: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please enter a valid email',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minLength: [5, 'Password must be up to 5 characters'],
      // maxLength: [50, 'Password must not be more than 23 characters'],
    },
    photo: {
      type: String,
      required: [true, 'Please add a photo'],
      default:
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png',
    },
    phone: {
      type: String,
      default: '+94',
    },
    bio: {
      type: String,
      maxLength: [150, 'Bio must not be more than 150 characters'],
      default: 'bio',
    },
  },
  { timestamps: true }
);

// can't use arrow function
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  // Encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

// Accessing Schema
const User = mongoose.model('User', userSchema);

// Adding created model to module's exports object
module.exports = User;
