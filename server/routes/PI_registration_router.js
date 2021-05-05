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
		})
	.get(
		function(req, res){
			return PI.get_all_participants()
				.then(data=>console.log(data))
				;
		}
	);

PIRouter.post('/assignment', function(req, res){
	return PI.login_and_assign(req.body.email_address)
		.then(data=>console.log(data))
		// .then((deploy_data)=>res.json(deploy_data))
		.catch(err=>res.status(err.status || 500).json({message:err.message}));

	// return research_pool.assignStudy(req.params.registration_id,res)
	//     .catch(err=>res.status(err.status || 500).json({message:err.message}));
});