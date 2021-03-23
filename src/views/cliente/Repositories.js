import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPI = '/api/general';
const updateRegistro = async (self) => {
  self.submitted      = true
  self.spinner        = true
  self.errors         = null
  self.form.ser_cotiz = self.form.ser_cot.value

	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/actualizar/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"), self.form);
    return response.data
	}catch(error) {
    self.submitted    = false
    self.spinner      = false
    self.errors       = alert.responseCatch(error, 'Code #1009');
	}
}
const getRegistro = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPI+'/get/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}
export default ({
  updateRegistro,
  getRegistro,
});