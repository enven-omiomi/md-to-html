import fs from "fs";
import path from "path";
import lib from "zenn-markdown-html";
// import "zenn-content-css";

const markdownToHtml = lib.default ? lib.default : lib;

// CSSファイルを読み込む
const cssPath = path.resolve('node_modules/zenn-content-css/lib/index.css');
const cssContent = fs.readFileSync(cssPath, 'utf-8');

// コマンドライン引数からMarkdownファイルのパスを取得
// const markdownFiles = process.argv.slice(2);

// コマンドライン引数を解析する関数
function parseArgs(args) {
  const options = {
    output: 'out/output.html', // デフォルトの出力先
    markdownFiles: []
  };

  for (let i = 2; i < args.length; i++) {
    if (args[i] === '-o' && args[i + 1]) {
      options.output = args[i + 1];
      i++; // オプションの値をスキップ
    } else {
      options.markdownFiles.push(args[i]);
    }
  }

  return options;
}

const options = parseArgs(process.argv);

// Markdownファイルを読み込んで1つの文字列に結合
const readMarkdownFiles = (files) => {
  return files.map(file => {
    const filePath = path.resolve(process.cwd(), file);
    return fs.readFileSync(filePath, 'utf-8');
  }).join('\n\n');
};

const markdownContent = readMarkdownFiles(options.markdownFiles);

const htmlContent = markdownToHtml(markdownContent);
const wrappedHtmlContent = `<style>\n${cssContent}\n</style>\n<div class="znc">\n${htmlContent}\n</div>`;

// HTMLファイルに出力（例：output.html）
fs.writeFileSync(options.output, wrappedHtmlContent);
