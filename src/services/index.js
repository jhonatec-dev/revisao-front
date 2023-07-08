import axios from "axios";
import Swal from "sweetalert2";

const getRanking = async () => {
  try {
    const response = await axios.get(
      "https://servicodados.ibge.gov.br/api/v2/censos/nomes/ranking/"
    );
    return response.data[0].res;
  } catch (error) {
    console.error(error.message);
  }
};

const getName = async (name) => {
  try {
    console.log(name)
    const response = await axios.get(
      `https://servicodados.ibge.gov.br/api/v2/censos/nomes/${name}`
    );
    console.log('response name', response)
    return response.data[0].res;
  } catch (error) {
    return [];
  }
};

const showError = (message) => Swal.fire({
  icon: 'error',
  title: 'Oops...',
  text: message,
  timer: 2000,
  timerProgressBar: true,
  confirmButtonColor: '#cd4b39',

})

const saveToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const getFromLS = (key) => {
  return JSON.parse(localStorage.getItem(key))
}


export { getFromLS, getName, getRanking, saveToLS, showError };

