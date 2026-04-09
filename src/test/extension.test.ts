import * as assert from 'assert';
import * as vscode from 'vscode';
import {suite, test} from 'mocha';
import { IndentConverter } from '../IndentConverter';

suite('IndentConverter Tests', () => {
  vscode.window.showInformationMessage('Start all tests.');

  // ================================
  // toTabs() - Basic Tests
  // ================================
  suite('toTabs() - Basic Functionality', () => {
    test('should convert spaces to tabs (tabSize=4)', () => {
      const input = '        line1\n    line2\n  line3';
      const expected = '\t\tline1\n\tline2\n  line3';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should allow incomplete indentation when not full tabSize', () => {
      const input = '   line1\n        line2';
      const expected = '   line1\n\t\tline2';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should preserve spaces in middle of content', () => {
      const input = 'line    with    spaces';
      const expected = 'line    with    spaces';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle empty input', () => {
      const result = IndentConverter.toTabs('', 4);
      assert.strictEqual(result, '');
    });

    test('should preserve lines without indentation', () => {
      const input = 'line1\nline2\nline3';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, input);
    });
  });

  // ================================
  // toSpaces() - Basic Tests
  // ================================
  suite('toSpaces() - Basic Functionality', () => {
    test('should convert tabs to spaces (tabSize=4)', () => {
      const input = '\t\tline1\n\tline2\nline3';
      const expected = '        line1\n    line2\nline3';
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should preserve tabs in middle of content', () => {
      const input = 'line\twith\ttabs';
      const expected = 'line\twith\ttabs';
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle empty input', () => {
      const result = IndentConverter.toSpaces('', 4);
      assert.strictEqual(result, '');
    });

    test('should preserve lines without tabs', () => {
      const input = 'line1\nline2\nline3';
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, input);
    });
  });

  // ================================
  // toTabs() - Edge Cases & Variations
  // ================================
  suite('toTabs() - Edge Cases & Different tabSizes', () => {
    test('should preserve incomplete indentation (less than tabSize)', () => {
      const input = '  line';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, input);
    });

    test('should handle partial indentation (not multiple of tabSize)', () => {
      const input = '      line'; // 6 spaces with tabSize=4
      const expected = '\t  line'; // 1 tab + 2 spaces
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle mixed spaces and tabs', () => {
      const input = '    line1\n\tline2\n  line3';
      const expected = '\tline1\n\tline2\n  line3';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should not modify tabs followed by spaces', () => {
      const input = '\t  line';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, input);
    });

    test('should convert line with only spaces', () => {
      const input = '        '; // 8 spaces
      const expected = '\t\t'; // 2 tabs
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle large indentation', () => {
      const input = '                line'; // 16 spaces
      const expected = '\t\t\t\tline'; // 4 tabs
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle multiple lines with varying indentation', () => {
      const input = '    line1\n        line2\n  line3\n            line4';
      const expected = '\tline1\n\t\tline2\n  line3\n\t\t\tline4';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=1', () => {
      const input = '   line'; // 3 spaces
      const expected = '\t\t\tline';
      const result = IndentConverter.toTabs(input, 1);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=2', () => {
      const input = '    line'; // 4 spaces
      const expected = '\t\tline';
      const result = IndentConverter.toTabs(input, 2);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=3', () => {
      const input = '      line'; // 6 spaces
      const expected = '\t\tline';
      const result = IndentConverter.toTabs(input, 3);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=5', () => {
      const input = '        line'; // 8 spaces
      const expected = '\t   line';
      const result = IndentConverter.toTabs(input, 5);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=8', () => {
      const input = '        line'; // 8 spaces
      const expected = '\tline';
      const result = IndentConverter.toTabs(input, 8);
      assert.strictEqual(result, expected);
    });

    test('should handle odd spaces with tabSize=2', () => {
      const input = '     line'; // 5 spaces
      const expected = '\t\t line';
      const result = IndentConverter.toTabs(input, 2);
      assert.strictEqual(result, expected);
    });

    test('should handle special characters in content', () => {
      const input = '    line with @#$%^&*()';
      const expected = '\tline with @#$%^&*()';
      const result = IndentConverter.toTabs(input, 4);
      assert.strictEqual(result, expected);
    });
  });

  // ================================
  // toSpaces() - Edge Cases & Variations
  // ================================
  suite('toSpaces() - Edge Cases & Different tabSizes', () => {
    test('should convert line with only tabs', () => {
      const input = '\t\t'; // 2 tabs
      const expected = '        '; // 8 spaces
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle large tab indentation', () => {
      const input = '\t\t\t\tline'; // 4 tabs
      const expected = '                line'; // 16 spaces
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle multiple lines with varying tabs', () => {
      const input = '\tline1\n\t\tline2\nline3\n\t\t\tline4';
      const expected = '    line1\n        line2\nline3\n            line4';
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should handle mixed tabs and spaces at line start', () => {
      const input = '\t  line'; // tab + 2 spaces
      const expected = '      line'; // 4 spaces for tab + 2 spaces
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=1', () => {
      const input = '\t\t\tline'; // 3 tabs
      const expected = '   line'; // 3 spaces
      const result = IndentConverter.toSpaces(input, 1);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=2', () => {
      const input = '\t\tline'; // 2 tabs
      const expected = '    line'; // 4 spaces
      const result = IndentConverter.toSpaces(input, 2);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=3', () => {
      const input = '\t\tline'; // 2 tabs
      const expected = '      line'; // 6 spaces
      const result = IndentConverter.toSpaces(input, 3);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=5', () => {
      const input = '\tline';
      const expected = '     line'; // 5 spaces
      const result = IndentConverter.toSpaces(input, 5);
      assert.strictEqual(result, expected);
    });

    test('should support tabSize=8', () => {
      const input = '\tline';
      const expected = '        line';
      const result = IndentConverter.toSpaces(input, 8);
      assert.strictEqual(result, expected);
    });

    test('should handle special characters in content', () => {
      const input = '\tline with @#$%^&*()';
      const expected = '    line with @#$%^&*()';
      const result = IndentConverter.toSpaces(input, 4);
      assert.strictEqual(result, expected);
    });
  });

  // ================================
  // Complex Mixed Indentation Tests
  // ================================
  suite('Complex Mixed Indentation (spaces + tabs combinations)', () => {
    test('should handle spaces followed by tabs in same line start', () => {
      const input = '  \tline'; // 2 spaces + 1 tab
      // This should be treated based on width calculation
      const result = IndentConverter.toTabs(input, 4);
      // Width = 2 + 4 = 6, which is 1 tab + 2 spaces
      const expected = '\t  line';
      assert.strictEqual(result, expected);
    });

    test('should handle spaces followed by multiple tabs', () => {
      const input = '  \t\tline'; // 2 spaces + 2 tabs
      // Width = 2 + 4 + 4 = 10, which is 2 tabs + 2 spaces
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t  line';
      assert.strictEqual(result, expected);
    });

    test('should handle tab followed by different number of spaces', () => {
      const input = '\t    line'; // 1 tab + 4 spaces
      // Width = 4 + 4 = 8, which is 2 tabs
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\tline';
      assert.strictEqual(result, expected);
    });

    test('should handle tab followed by 1 space', () => {
      const input = '\t line'; // 1 tab + 1 space
      // Width = 4 + 1 = 5, which is 1 tab + 1 space
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t line';
      assert.strictEqual(result, expected);
    });

    test('should handle multiple tabs and spaces alternating', () => {
      const input = '\t  \t  line'; // tab + 2 spaces + tab + 2 spaces
      // Width = 4 + 2 + 4 + 2 = 12, which is 3 tabs
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t\tline';
      assert.strictEqual(result, expected);
    });

    test('should handle multiple spaces, tabs, spaces pattern', () => {
      const input = '    \t    line'; // 4 spaces + tab + 4 spaces
      // Width = 4 + 4 + 4 = 12, which is 3 tabs
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t\tline';
      assert.strictEqual(result, expected);
    });

    test('toSpaces: should handle spaces in middle of tab indentation', () => {
      const input = '\t  \t  line'; // tab + 2 spaces + tab + 2 spaces
      // Width = 4 + 2 + 4 + 2 = 12 spaces
      const result = IndentConverter.toSpaces(input, 4);
      const expected = '            line';
      assert.strictEqual(result, expected);
    });

    test('toSpaces: should handle spaces then tabs then spaces', () => {
      const input = '  \t  \tline'; // but regex matches [ \t]+ from start
      // Converts to spaces based on total width
      const result = IndentConverter.toSpaces(input, 4);
      // This should match the [ \t]+ pattern, width = 2 + 4 + 2 + 4 = 12
      const expected = '            line';
      assert.strictEqual(result, expected);
    });

    test('should handle uneven mixed: 3 spaces + 1 tab', () => {
      const input = '   \tline'; // 3 spaces + 1 tab
      // Width = 3 + 4 = 7, which is 1 tab + 3 spaces
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t   line';
      assert.strictEqual(result, expected);
    });

    test('should handle multiple tabs with single space between content', () => {
      const input = '\t  \tline'; // tab + 2 spaces + tab (then line)
      // Note: 'line' immediately follows, so total width = 4 + 2 + 4 = 10
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t  line';
      assert.strictEqual(result, expected);
    });

    test('toSpaces: mixed indentation with varying tabs', () => {
      const input = '\t    \t  \t\tline'; // complex pattern
      // Width = 4 + 4 + 4 + 2 + 4 + 4 = 22 spaces
      const result = IndentConverter.toSpaces(input, 4);
      const expected = '                      line';
      assert.strictEqual(result, expected);
    });

    test('should handle mixed after recalc: spaces equal to 1.5 tabs', () => {
      const input = '      \t\t\tline'; // 6 spaces + 3 tabs
      // Width = 6 + 4 + 4 + 4 = 18, which is 4 tabs + 2 spaces
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t\t\t  line';
      assert.strictEqual(result, expected);
    });

    test('should handle mixed: very small space then large tab count', () => {
      const input = ' \t\t\t\tline'; // 1 space + 4 tabs
      // Width = 1 + 4 + 4 + 4 + 4 = 17, which is 4 tabs + 1 space
      const result = IndentConverter.toTabs(input, 4);
      const expected = '\t\t\t\t line';
      assert.strictEqual(result, expected);
    });
  });

  // ================================
  // Round-trip Conversion Tests
  // ================================
  suite('Round-trip Conversions (preserving visual alignment)', () => {
    test('toTabs then toSpaces should preserve original spaces', () => {
      const original = '        line1\n    line2\n  line3';
      const toTabs = IndentConverter.toTabs(original, 4);
      const backToSpaces = IndentConverter.toSpaces(toTabs, 4);
      assert.strictEqual(backToSpaces, original);
    });

    test('toSpaces then toTabs should preserve original tabs', () => {
      const original = '\t\tline1\n\tline2\nline3';
      const toSpaces = IndentConverter.toSpaces(original, 4);
      const backToTabs = IndentConverter.toTabs(toSpaces, 4);
      assert.strictEqual(backToTabs, original);
    });

    test('round-trip with mixed indentation (space+tab) - converts to canonical form', () => {
      const original = '  \tline'; // 2 spaces + tab, width = 6
      const toTabs = IndentConverter.toTabs(original, 4); // 1 tab + 2 spaces
      const toSpaces = IndentConverter.toSpaces(toTabs, 4); // 6 spaces
      // Note: not identical to original but visually same width
      assert.strictEqual(toSpaces, '      line');
    });
  });

});
