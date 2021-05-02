const express     = require('express');
const PI          = require('../PI');
const demographicsController   = require('../data_server/controllers/demographicsController');
const research_pool = require('../researchpool');
const PIRouter = express.Router();

module.exports = PIRouter;


PIRouter.route('/registration')
    .post(
        function(req, res){
            return PI.registration(req.body.email_address)
                .then(data=> res.redirect('/launch_registration/'+data._id))
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
        })
	.put(
		function(req, res){
			return demographicsController.insertDemographics(req,res)
			.catch(err=>res.status(err.status || 500).json({message:err.message}));
		});
PIRouter.get('/assign/:registration_id', function(req, res){
	return research_pool.assignStudy(req.params.registration_id,res)
                .catch(err=>res.status(err.status || 500).json({message:err.message}));
	});