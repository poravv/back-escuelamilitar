const express = require('express');
const routes = express.Router();
const jwt = require("jsonwebtoken");
const database = require('../database');
const verificaToken = require('../middleware/token_extractor')
const{DataTypes}=require("sequelize")
require("dotenv").config()


