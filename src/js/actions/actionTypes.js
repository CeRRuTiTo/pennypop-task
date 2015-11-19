import keyMirror from "keymirror";

function generateActions(actions) {
  const actionMap = {};

  for (const i in actions) {
    actionMap[actions[i]] = null;
  }

  return keyMirror(actionMap);
}

export default generateActions([
  "SIGN_UP",
  "LOGIN",
  "LOGOUT"
]);
