const Order = require('../models/order');
const Product = require('../models/product');

exports.ordersGetAll = (req,res,next)=>{
    Order.find()
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(docs=>{
        res.status(200).json({
            count: docs.length,
            orders: docs.map(doc=>{
                return{
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    request:{
                        Type: 'GET',
                        url: 'http://localhost:3000/orders/'+ doc._id
                    }
                }
            })
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
}
