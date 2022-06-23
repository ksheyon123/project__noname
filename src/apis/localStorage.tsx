const setPrivateKey = async (priv: string) => {
  window.localStorage.setItem("privateKey", priv);
}

const getPrivateKey = () => {
  const privKey = window.localStorage.getItem("privateKey");
  return privKey;
}

export {
  setPrivateKey,
  getPrivateKey
}