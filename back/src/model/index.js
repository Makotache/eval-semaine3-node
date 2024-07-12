import { Sequelize, DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config()

// Config Database
const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_PASSWORD, '', {
    host: 'localhost',
    dialect: 'mysql'
});


// Définir le modèle Supplier
const Suppliers = sequelize.define('Suppliers', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'suppliers',
    timestamps: false
});


// Définir le modèle Material
const Materials = sequelize.define('Materials', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Suppliers,
            key: 'id'
        }
    }
}, {
    tableName: 'materials',
    timestamps: false
});


// Définir le modèle Product
const Products = sequelize.define('Products', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    category: {
        type: DataTypes.ENUM("shelf", "cupboard"),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    count: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'products',
    timestamps: false
});

// Définir le modèle ProductMaterial
const ProductsMaterials = sequelize.define('ProductsMaterials', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Products,
            key: 'id'
        }
    },
    material_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Materials,
            key: 'id'
        }
    }
}, {
    tableName: 'products_materials',
    timestamps: false
});


// Définir les relations entre les modèles
Products.belongsToMany(Materials, { through: ProductsMaterials, foreignKey: 'product_id' });
Materials.belongsToMany(Products, { through: ProductsMaterials, foreignKey: 'material_id' });
Materials.belongsTo(Suppliers, { foreignKey: 'supplier_id' });

export { Materials, Products, ProductsMaterials, Suppliers, sequelize };
