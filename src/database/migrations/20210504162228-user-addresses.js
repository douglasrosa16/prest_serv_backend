'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('addresses',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model : 'users', key: 'id'},
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        cep: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        rua: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        numero: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        cidade: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        estado: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        pais: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        }
      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('addresses');
  }
};
