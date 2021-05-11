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
	.put(function(req, res){
		return demographicsController.insertDemographics(req,res)
				.catch(err=>res.status(err.status || 500).json({message:err.message}));
		})
	.get(
		function(req, res){
			return PI.get_all_participants()
				.then(data=>console.log(data))
				;
		}
	);

PIRouter.post('/assignment', function(req, res){
	if (req.session.participant_data)
		return res.redirect('/assign/');
	return PI.login_and_assign(req.body.email_address)
		.then(participant_data => {
			req.session.participant_data = participant_data;
			res.redirect('/assign/');
		})
		.catch(err=>res.status(err.status || 500).json({message:err.message}));
});

PIRouter.get('/assignment', function(req, res){
	return res.json(!!req.session.participant_data);

	// return res.redirect('/dashboard/?/assignment');
});

PIRouter.put('/setstart/:session_id/', function(req, res){
	try{research_pool.updateExperimentStatus(req.params.session_id,'started',res)}
	catch(err){res.status(err.status || 500).json({message:err.message})};
});
PIRouter.put('/setcomplete/:session_id', function(req, res){
	return research_pool.updateExperimentStatus(req.params.session_id,'completed',res)
		.catch(err=>res.status(err.status || 500).json({message:err.message}));
});
