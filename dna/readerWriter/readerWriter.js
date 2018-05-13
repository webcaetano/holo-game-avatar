function genesis() {
  return true;
}

function holoTextWrite(json) {
	console.log(json)
	var hash = commit('holoText', json);
	return hash;
}

function validateCommit() {
	return true;
}

function holoTextRead(hash) {
	// var holoText = get(hash, { Local: true });
	var holoText = get(hash)
	console.log(hash)
	console.log(holoText)
	return holoText;
}


function validatePut() {
	return true;
}
