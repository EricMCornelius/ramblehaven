import {opendir} from 'node:fs/promises';

const list_files = async function* (dir) {
  const pending = [];
  pending.push(dir);

  while (pending.length > 0) {
    const next = pending.pop();
    const dirent = await opendir(next);
    for await (const entry of dirent) {
      if (entry.isDirectory()) {
        pending.push(`${next}/${entry.name}`);
      }
      else {
        yield `${next}/${entry.name}`;
      }
    }
  }
};

export default list_files;
