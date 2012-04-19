 var childProcess = require('child_process'),
     ls;

 processo_um = childProcess.exec('xsltproc lattes2mods.xsl LATTES.xml > LATTES.mods', function (error, stdout, stderr) {
   console.log('Child Process STDOUT: '+stdout);
   console.log('Child Process STDERR: '+stderr);
 });

 processo_um.on('exit', function (code) {
   console.log('Child process exited with exit code '+code);
 });
