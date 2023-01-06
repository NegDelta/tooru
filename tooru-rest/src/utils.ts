import createDebug from 'debug';

createDebug.enable('tooru:*');
export const tooruDebug = (name: string) => createDebug(`tooru:${name}`);
