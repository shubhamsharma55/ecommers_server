// const { Category } = require( "@material-ui/icons")

const categoryCtrl = {
    getCategories : async(req,res) => {

        try {
            const category = await Category.find();
        } catch (err) {
            
        }
    }
}

module.exports = categoryCtrl