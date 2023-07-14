import { DataTypes, Model } from 'sequelize';
import md5 from 'md5';
import sequelize from '../services/sequelize';

const { PASSWORD_SECRET } = process.env;

class Users extends Model {
  static passHash = (password) => md5(md5(password) + PASSWORD_SECRET);
}

Users.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  // address:{},

  // phone:{},

  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'email',
  },

  role: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'USER',
  },

  password: {
    type: DataTypes.CHAR(32),
    allowNull: false,
    get() {
      return undefined;
    },
    set(pass) {
      if (pass) {
        this.setDataValue('password', Users.passHash(pass));
      }
    },
  },
  status: {
    type: DataTypes.ENUM('active', 'pending'),
    allowNull: false,
    defaultValue: 'pending',
  },
  activationCode: {
    type: DataTypes.STRING,
    allowNull: true,
    // get() {
    //     return undefined;
    // }
  },

}, {
  sequelize,
  tableName: 'users',
  modelName: 'users',

});

export default Users;
