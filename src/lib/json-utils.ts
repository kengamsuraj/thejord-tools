export interface FormatOptions {
  indent: number;
  sortKeys: boolean;
  trailingComma: boolean;
  quoteStyle: 'double' | 'single';
  maxLineLength: number;
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  line?: number;
  column?: number;
}

export function validateJSON(input: string): ValidationResult {
  if (!input || input.trim() === '') {
    return { valid: false, error: 'Empty input' };
  }

  try {
    JSON.parse(input);
    return { valid: true };
  } catch (error) {
    if (error instanceof SyntaxError) {
      const match = error.message.match(/position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      const lines = input.substring(0, position).split('\n');
      const line = lines.length;
      const column = lines[lines.length - 1].length + 1;

      return {
        valid: false,
        error: error.message,
        line,
        column,
      };
    }
    return { valid: false, error: 'Unknown error' };
  }
}

export function formatJSON(input: string, options: FormatOptions): string {
  try {
    let parsed = JSON.parse(input);

    if (options.sortKeys) {
      parsed = sortObjectKeys(parsed);
    }

    const formatted = JSON.stringify(parsed, null, options.indent);
    return formatted;
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

export function minifyJSON(input: string): string {
  try {
    const parsed = JSON.parse(input);
    return JSON.stringify(parsed);
  } catch (error) {
    throw new Error('Invalid JSON');
  }
}

function sortObjectKeys(obj: any): any {
  if (Array.isArray(obj)) {
    return obj.map(sortObjectKeys);
  }

  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj)
      .sort()
      .reduce((result: any, key) => {
        result[key] = sortObjectKeys(obj[key]);
        return result;
      }, {});
  }

  return obj;
}

export function getJSONStats(input: string): {
  size: number;
  objects: number;
  arrays: number;
  keys: number;
} {
  try {
    const parsed = JSON.parse(input);
    let objects = 0;
    let arrays = 0;
    let keys = 0;

    function count(obj: any) {
      if (Array.isArray(obj)) {
        arrays++;
        obj.forEach(count);
      } else if (obj !== null && typeof obj === 'object') {
        objects++;
        keys += Object.keys(obj).length;
        Object.values(obj).forEach(count);
      }
    }

    count(parsed);

    return {
      size: new Blob([input]).size,
      objects,
      arrays,
      keys,
    };
  } catch {
    return { size: 0, objects: 0, arrays: 0, keys: 0 };
  }
}
