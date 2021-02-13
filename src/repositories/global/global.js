var global = {
  showPassword(type_pass, icon_pass) {
    return [
      type_pass = type_pass === 'password' ? 'text' : 'password',
      icon_pass = icon_pass === 'cilLockLocked' ? 'cilLockUnlocked' : 'cilLockLocked'
    ]
  },
  newPassword() {
    let minuculas = "abcdefghijkmnpqrtuvwxyz";
    let mayusculas = "ABCDEFGHJKMNPQRTUVWXYZ";
    let numeros = "2346789";
    let password = "";
    for (var i=0; i<3; i++) {
      password +=minuculas.charAt(Math.floor(Math.random()*minuculas.length));
      password +=mayusculas.charAt(Math.floor(Math.random()*mayusculas.length));
      password +=numeros.charAt(Math.floor(Math.random()*numeros.length));
    }

    return password
  },
}

export default global