import "regenerator-runtime/runtime";
import axios from "axios";
import alert from '@/repositories/global/alert'

const urlAPIF= '/api/factura';
const getFactura = async (self) => {
	try {
    let response = await axios.post(self.$apiAdress+urlAPIF+'/get/'+self.$route.params.id+'?token='+localStorage.getItem("api_token"));
    
		return response.data
	}catch(error) {
		alert.responseCatch(error, 'Code #1012')
	}
}
export default ({
  getFactura
 
  
});