import { debuglog } from 'util';

interface IConsoleLog {
  print(message: string): void;
}

export default class ConsoleLog implements IConsoleLog {
  private readonly type?: 'info' | 'error' | 'warn' | 'debug';

  private readonly prefix?: string;

  private readonly silent?: boolean;

  private readonly locale?: string;

  /**
   * When using an instance, it is not necessary to enter
   * additional data such as type or prefix, only the message.
   * @param {'info' | 'error' | 'warn' | 'debug' } [type] Defines how the message will appear in the console. Defaults is "log". P.S: To view debugs, environment variable "NODE_DEBUG" must receive an array with descriptions informed in the 'prefix' parameter.
   * @param {string} [prefix] Will appear before the message, between square brackets [prefix], if not informed will appear [UNKNOWN].
   * @param {boolean} [silent] Useful for hiding messages in certain scenarios without removing the function call, eg, silent mode. It does not apply to "log" and "debug" type.
   * @param {string} [locale] Date and Time Location, e.g: br-PT, en-US... default: locale of the JavaScript runtime is used.
   */
  constructor(
    /** @default 'log' */
    type?: 'info' | 'error' | 'warn' | 'debug',
    prefix?: string,
    silent?: boolean,
    locale?: string,
  ) {
    this.type = type;
    this.prefix = prefix;
    this.silent = silent;
    this.locale = locale;
  }

  /**
   * Prints on the console.
   * @param {string} message Message to be printed on the console.
   */
  print(message: string): void {
    ConsoleLog.print(message, this.type, this.prefix, this.silent, this.locale);
  }

  /**
   * Static version of the printConsole method.
   *
   * @param message
   * @param {'info' | 'error' | 'warn' | 'debug' } [type] Defines how the message will appear in the console. Defaults is "log". P.S: To view debugs, environment variable "NODE_DEBUG" must receive an array with descriptions informed in the 'prefix' parameter.
   * @param {string} [prefix] Will appear before the message, between square brackets [prefix], if not informed will appear [UNKNOWN].
   * @param {boolean} [silent] Useful for hiding messages in certain scenarios without removing the function call, eg, silent mode. It does not apply to "log" and "debug" type.
   * @param {string} [locale] Date and Time Location, e.g: br-PT, en-US... default: locale of the JavaScript runtime is used.
   */
  static print(
    message: string,
    /** @default 'log' */
    type?: 'info' | 'error' | 'warn' | 'debug',
    prefix?: string,
    silent?: boolean,
    locale?: string,
  ): void {
    const formattedMessage = ConsoleLog.buildMessage(
      message,
      type ?? 'log',
      prefix ?? 'UNKNOWN',
      locale,
    );

    switch (true) {
      case (type ?? 'log') === 'log': {
        console.log(`${ConsoleLog.getNow(locale)} - ${message}`);
        break;
      }
      case type === 'info' && !(silent ?? false): {
        console.info(formattedMessage);
        break;
      }
      case type === 'error' && !(silent ?? false): {
        console.error(formattedMessage);
        break;
      }
      case type === 'warn' && !(silent ?? false): {
        console.warn(formattedMessage);
        break;
      }
      case type === 'debug' && !(silent ?? false): {
        const debug = debuglog(prefix!.toUpperCase());
        debug(`${ConsoleLog.getNow(locale)} - ${message}`);
        break;
      }
      default:
    }
  }

  /**
   * Build a message, by composing it's type with the datetime and the message itself.
   *
   * @private
   * @param {string} message The message to be print.
   * @param {string} type Type of message to be printed on the console.
   * @param {string} prefix A prefix to give context about the message.
   * @param {string} [locale] Date and Time Location, e.g: br-PT, en-US... default: locale of the JavaScript runtime is used.
   * @returns {string} The composed message
   */
  private static buildMessage(
    message: string,
    type: string,
    prefix: string,
    locale?: string,
  ): string {
    return `[${type.toUpperCase()}](${prefix.toUpperCase()}) ${ConsoleLog.getNow(
      locale,
    )} - ${message}`;
  }

  /**
   * Get current Date and Time in localized format.
   * @private
   * @param {string} [locale] Date and Time Location, e.g: br-PT, en-US... default: locale of the JavaScript runtime is used.
   * @returns {string} Date and time in localized format.
   */
  private static getNow(locale?: string): string {
    return `${new Date().toLocaleDateString(
      locale,
    )} ${new Date().toLocaleTimeString(locale)}`;
  }
}
