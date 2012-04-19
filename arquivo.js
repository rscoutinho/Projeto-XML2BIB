
/**
 * Modulos dependentes
 */

var express = require('express')
  , routes = require('./routes')
  , childProcess = require('child_process')
  , fs = require('fs');

// Transferência de dados
fs.readFile('4423.bib','ascii', function(err,data){
   if(err) {
        console.error("Could not open file: %s", err);
   }
console.log(data);
});
