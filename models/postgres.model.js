import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('postgres://postgres:plokplok@localhost:5432/Kelp_Global', {
    logging: false
});

//Defining the table schema
export const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    address: {
        type: DataTypes.JSONB,
        allowNull: false
    },
    additionalInfo: {
        type: DataTypes.JSONB,
        allowNull: false
    }
}, {
    timestamps: false
});

//in case of a table is not being created the sequalize would create it with the following code 
(async () => {
    await sequelize.sync().then(() => {
        console.log("Database has been created successfully.")
    })
})();
