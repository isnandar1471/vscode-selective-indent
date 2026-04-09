export class IndentConverter {
  /**
   * Converts all types of leading indentation (mixed spaces/tabs) into pure spaces.
   * Standardizes the visual width based on the provided tabSize.
   */
  public static toSpaces(text: string, tabSize: number): string {
    return text.replace(/^[ \t]+/gm, (match) => {
      const width = this.calculateWidth(match, tabSize);
      return " ".repeat(width);
    });
  }

  /**
   * Converts all types of leading indentation into tabs.
   * If the total width is not perfectly divisible by tabSize,
   * the remainder is appended as spaces to maintain visual alignment.
   */
  public static toTabs(text: string, tabSize: number): string {
    return text.replace(/^[ \t]+/gm, (match) => {
      const width = this.calculateWidth(match, tabSize);

      const tabCount = Math.floor(width / tabSize);
      const spaceCount = width % tabSize;

      return "\t".repeat(tabCount) + " ".repeat(spaceCount);
    });
  }

  /**
   * Calculates the total visual width of an indentation string.
   * Tabs are weighted as tabSize, and spaces are weighted as 1.
   */
  private static calculateWidth(indent: string, tabSize: number): number {
    let width = 0;
    for (const char of indent) {
      width += char === "\t" ? tabSize : 1;
    }
    return width;
  }
}
