const express     = require('express');
const PI          = require('../PI');
const experiments   = require('../experiments');
const demographicsController   = require('../data_server/controllers/demographicsController');
const research_pool = require('../researchpool');
const PIRouter = express.Router();

module.exports = PIRouter;


PIRouter.route('/registration')
    .post(
        function(req, res){
            return PI.registration(req.body.email_address)
                .then(data=>
                    // res.json({url:'/registration/'+data._id})

                    res.redirect('/assign/'+data._id)
                )

                // .then(data=>
                //     {
                //         return res.redirect('/registration/'+data._id);
                // //         // return experiments
                // //         //     .get_experiment_url(req, false, data._id)
                // //         //     .then(displayExperiment(req.query, res,req.fingerprint))
                // //         //     .catch(displayErrorPage(res));
                // //
                //     }
                // )

                // .then(data=>res.json(data._id))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
	    .put(
	        function(req, res){
	            return demographicsController.insertDemographics(req,res)
	                .catch(err=>res.status(err.status || 500).json({message:err.message}));
	        }
	);
PIRouter.route('/assign/:registration_id')
    .get(
        function(req, res){
            return research_pool.assignStudy(req.params.registration_id,res)
                .catch(err=>res.status(err.status || 500).json({message:err.message}));

        });