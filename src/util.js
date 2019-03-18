/**
 * Kinda like the `classNames` function but for BEM style classes
 * @param  {String} blockName Name of the block
 * @param  {String} modifiers A string of other class names to modify this one
 * @return {String}           A string of CSS class names separated by spaces
 */
export function getClasses(blockName, modifiers = "") {
  const prefixedBlockName = `ui95-${blockName}`;
  return [prefixedBlockName, ...modifiers.split(" ")].join(
    ` ${prefixedBlockName}--`
  );
}
