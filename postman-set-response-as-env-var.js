var isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};

var isNotObjectOrArray = function (obj) {
	return ! (isPlainObject(obj) && Array.isArray(obj));
};

var jsonData = JSON.parse(responseBody);

function setEnvVar(prefix, data){
  for (var prop in jsonData){
      if (isNotObjectOrArray(prop)){
          pm.environment.set(prefix+prop, data[prop]);
          log.debug("Setting env variable - " + prefix.prop + " = " + data[prop]);
      }else{
          log.info("Skipping response property - " + prefix.prop );
      }
  }
}

function initiateSetEnvVar(){
  setEnvVar("resp.", jsonData);
}

initiateSetEnvVar();
