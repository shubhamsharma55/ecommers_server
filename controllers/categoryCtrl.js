// const { Category } = require( "@material-ui/icons")

const categoryModel = require("../models/categoryModel");

const categoryCtrl = {
    getCategories : async(req,res) => {

        // try {
        //     const categories = await categoryModel.find();
        //     res.json(categories)
        // } catch (err) {
        //     return res.status(500).json({msg:err.message})
        // }
    },
    createCategory:async(res,req) => {
        try {
            res.json('check Admin Success')
        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
    }
}

module.exports = categoryCtrl