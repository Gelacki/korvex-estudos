const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  obterConfig: () => ipcRenderer.invoke('config:obter'),
  escolherPasta: () => ipcRenderer.invoke('config:escolherPasta'),
  salvarPdf: (dados) => ipcRenderer.invoke('pdf:salvar', dados),
  arquivosExistem: (nomes) => ipcRenderer.invoke('arquivos:existem', nomes),
  abrirArquivo: (nome) => ipcRenderer.invoke('arquivo:abrir', nome),
  abrirPasta: (sub) => ipcRenderer.invoke('pasta:abrir', sub),
  versao: () => ipcRenderer.invoke('app:versao')
});
