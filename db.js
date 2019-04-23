const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
})

sequelize.authenticate()
.then(
    function () {
        console.log('Connected to dogprojectapi postgres database');
    },
    function (Err) {
        console.log(err);
    }
);


// Associations
const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./models/user')(sequelize, Sequelize);
db.Month = require('./models/month')(sequelize, Sequelize);
db.Profile = require('./models/profile')(sequelize, Sequelize);
db.Conversation = require('./models/conversation')(sequelize, Sequelize);
db.Message = require('./models/message')(sequelize, Sequelize);

// db.Likes.belongsTo(db.Dogs, {onDelete: 'cascade' });
// db.Dogs.hasMany(db.Likes, {onDelete: 'cascade' });
// db.Likes.belongsTo(db.User, {onDelete: 'cascade' });
// db.User.hasMany(db.Likes, {onDelete: 'cascade' });
// db.User.hasMany(db.Dogs, { onDelete: 'cascade' });


module.exports = {
    db: db,
    sequelize: sequelize
};