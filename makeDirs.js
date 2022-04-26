export const makeDirs = (fn) => {
  let i = fn.lastIndexOf("/");
  for (;;) {
    const dir = fn.substring(0, i);
    console.log(dir);
    if (dir.length <= 1) {
      break;
    }
    try {
      Deno.mkdirSync(dir, { recuirsive: true });
    } catch (e) {
      break; // AlreadyExists
    }
    i = fn.lastIndexOf("/", i - 1);
  }
  return fn;
};
