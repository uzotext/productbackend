const Product = require("../module/product.module.js")

// GET ALL PRODUCT

const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
};

// GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//update new product
let updateProduct = async (req, res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({message: "Product Not Found"});
        }
        const updateProduct = await Product.findById(id);
        res.status(200).json(updateProduct);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete new product

let deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({message: "Product Not Found"});
        }

        res.status(200).json({ message: "Product Delete Successfully"});

}catch (error) {
    res.status(500).json({ message: error.message});
}
};

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    updateProduct,
    deleteProduct,
};