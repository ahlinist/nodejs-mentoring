const { UserGroup, sequelize } = require("../db/models/");

const addUsersToGroup = (userIds, groupId) => {
    /*return UserGroup.findOne({
      where: { groupId },
    })
    .then(userGroup => {
      return userGroup ? userGroup.update({userIds}) : UserGroup.create({ userIds, groupId });
    });*/

    // Transactions are redundant here but for the learning sake:

    return UserGroup.findOne({
      where: { groupId },
    })
    .then(async userGroup => {
      let transaction;

      try {
        transaction = await sequelize.transaction();

        if (userGroup) {
          userGroup.update({userIds}, {transaction})
            .then(() => transaction.commit());
        } else {
          UserGroup.create({ userIds, groupId }, {transaction})
            .then(() => transaction.commit());
        }
      } catch (e) {
        if (transaction) await transaction.rollback();
        throw e;
      }
    });
};

module.exports = { addUsersToGroup };
