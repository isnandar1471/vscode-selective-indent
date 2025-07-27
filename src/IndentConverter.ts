export class IndentConverter {

  public static tabsToSpaces(text: string, tabSize: number): string {
    const replaceWith: string = new Array(tabSize + 1).join(' ');
    const regex = new RegExp('^(\t+)', 'gm');

    const newText: string = text.replace(regex, (match) => {
      return replaceWith.repeat(match.length);
    });

    return newText;
  }

  public static spacesToTabs(text: string, tabSize: number): string {
    const replaceWith: string = '\t';
    const regex = new RegExp(`^( {${tabSize}})+`, 'gm');

    const newText: string = text.replace(regex, (match) => {
      const spaceCount = match.length;
      const tabCount = Math.floor(spaceCount / tabSize);

      return replaceWith.repeat(tabCount);
    });

    return newText;
  }

}
