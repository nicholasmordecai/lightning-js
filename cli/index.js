#!/usr/bin/env node

const fs = require('fs');
const ncp = require ('ncp').ncp;

ncp.limit = 16;

const template = './templates/basic';
const destination = './test/';
const currentDir = __dirname;

function copyTemplate(source, destination) {
    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('done!');
    });
}

copyTemplate(template, currentDir + '/test/');

/**
 * Break down of command:
 * 1. copy template into new directory
 * 2. run npm install
 * 3. copy the lightning.min.js, lightning.map.js and lightning.d.ts files
 * 4. run the build script
 */