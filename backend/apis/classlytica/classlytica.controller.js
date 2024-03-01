const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const {classlyticaModel} = require('./classlytica.model');
const Utils = require('../../configs/utils');
const Mailer = require('../../libs/emails/mailchimp');
const {helpers} = require('../../libs/utilities/helpers');
const fs = require("fs");

const {successful, redirection, client_error, server_error} = Utils.status_codes;

exports.classlyticaController = {
    createInterest: (req, res) => {
        console.log(req.body);
        classlyticaModel.createInterest(req.body).then(resp => {
            console.log(resp);
            res.status(successful.created).send(resp);
        }, error => {
            console.log(error);
            res.status(client_error.not_acceptable).send({message: error});
        });
    },

    createUserType: (req, res) => {
        console.log(req.body);
        // authModel.finishOnboarding(req.body).then(resp => {
        //     res.status(successful.created).send({message: 'finished'});
        // }, error => {
        //     res.status(client_error.not_acceptable).send({message: 'Failed to finish', error});
        // });
    }
}
