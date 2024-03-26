import { LanguageSupport } from "@codemirror/language";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { php } from "@codemirror/lang-php";
import { java } from "@codemirror/lang-java";

export const codeLanguages: {
  name: string,
  extensions: LanguageSupport,
}[] = [
  {
    name: "HTML",
    extensions: html(),
  },
  {
    name: "CSS",
    extensions: css(),
  },
  {
    name: "JavaScript",
    extensions: javascript({ jsx: true, typescript: true }),
  },
  {
    name: "Python",
    extensions: python(),
  },
  {
    name: "PHP",
    extensions: php(),
  },
  {
    name: "Java",
    extensions: java(),
  },
];
