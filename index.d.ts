import * as prism from 'prismjs';

export as namespace codeflask

export type LanguageDefinition = {
  [token: string]: prism.LanguageDefinition | RegExp
}

export type EventListeners = {
  [index: string]: (UIEvent) => void
}

export interface CodeFlaskOptions {
  language?: string
  rtl?: boolean
  tabSize?: number
  enableAutocorrect?: boolean
  lineNumbers?: boolean
  defaultTheme?: boolean
  areaId?: string
  ariaLabelledby?: string
  readonly?: boolean
  selfClosingCharacters: string[]
  customEventListeners?: EventListeners
}

export default class CodeFlask {
  constructor(selectorOrElement: Element | string, opts: CodeFlaskOptions)

  updateCode(newCode: string): void
  updateLanguage(newLanguage: string): void
  addLanguage(name: string, options: LanguageDefinition): void

  getCode(): string
  onUpdate(callback: (code: string) => void): void

  disableReadonlyMode(): void
  enableReadonlyMode(): void

  removeEventListeners(): void
  highlight(): void
  highlightLines(lineSpec: string): void
}
