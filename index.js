import fs from "fs";
import path from "path";
import lib from "zenn-markdown-html";
// import "zenn-content-css";

const markdownToHtml = lib.default ? lib.default : lib;

// CSSファイルを読み込む
const cssPath = path.resolve('node_modules/zenn-content-css/lib/index.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

// コマンドライン引数からMarkdownファイルのパスを取得
const markdownFiles = process.argv.slice(2);

// Markdownファイルを読み込んで1つの文字列に結合
const readMarkdownFiles = (files) => {
  return files.map(file => {
    const filePath = path.resolve(process.cwd(), file);
    return fs.readFileSync(filePath, 'utf-8');
  }).join('\n\n');
};

const markdownContent = readMarkdownFiles(markdownFiles);

const htmlContent = markdownToHtml(markdownContent);
const wrappedHtmlContent = `<style>\n${cssContent}\n</style>\n<div class="znc">\n${htmlContent}\n</div>`;

// HTMLファイルに出力（例：output.html）
fs.writeFileSync("out/output.html", wrappedHtmlContent);
