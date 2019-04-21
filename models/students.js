module.exports = function(sequelize, DataTypes) {
    var Students = sequelize.define("Student", {
        name: DataTypes.STRING
    }, {
        timestamp: false
    }
    );
    return Students;
}