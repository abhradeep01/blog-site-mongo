
const useLocalstorage = {
  getAuth: (name='') =>{
    return JSON.parse(localStorage.getItem(name));
  },
  setAuth: (name='',data) => {
    localStorage.setItem(name,JSON.stringify(data));
  },
  removeAuth: (name='') => {
    localStorage.removeItem(name);
  }
}

export default useLocalstorage