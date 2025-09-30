// script.js - comportamento simples para o exemplo

document.addEventListener('DOMContentLoaded', () => {
// Contador
const countEl = document.getElementById('count');
const inc = document.getElementById('increment');
const dec = document.getElementById('decrement');
let value = 0;

function render(){ countEl.textContent = value; }
inc.addEventListener('click', () => { value += 1; render(); });
dec.addEventListener('click', () => { value -= 1; render(); });

// Saudação
const form = document.getElementById('greetForm');
const nameInput = document.getElementById('name');
const greeting = document.getElementById('greeting');

form.addEventListener('submit', (e) => {
e.preventDefault();
const name = (nameInput.value || 'amigo').trim();
greeting.textContent = `Olá, ${name}! Bom trabalho com o Git.`;
nameInput.value = '';
});

// Download ZIP (gera um ZIP simples no browser usando blobs)
const downloadBtn = document.getElementById('downloadBtn');
downloadBtn.addEventListener('click', async () => {
// Cria arquivos como blobs
const files = {
'index.html': `<!doctype html>\n<html>\n<head><meta charset=\"utf-8\"></head><body>Veja os arquivos no repositório.</body></html>`,
'styles.css': '/* estilos */',
'script.js': '// script'
};

// Criar um ZIP simples em memória (usa JSZip se disponível) — fallback: criar um .txt agrupado
if (window.JSZip) {
const zip = new JSZip();
Object.entries(files).forEach(([name, text]) => zip.file(name, text));
const blob = await zip.generateAsync({type:'blob'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'simple-webpage.zip'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
} else {
// fallback: gera um arquivo .txt com separadores
const combined = Object.entries(files).map(([n,t]) => `--- FILE: ${n} ---\n${t}`).join('\n\n');
const blob = new Blob([combined], {type:'text/plain'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'simple-webpage-files.txt'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}
});

render();
});