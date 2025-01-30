//base by DGXeon (Xeon Bot Inc.)
//YouTube: @prexzyvilla
//Instagram: prexzy.ay
//Telegram: t.me/prexzyvilla_tech
//GitHub: @Prexzybooster
//WhatsApp: +2349159895444
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@Prexzyvilla

const { spawn } = require('child_process');
const path = require('path');

function start() {
  let args = [path.join(__dirname, 'main.js'), ...process.argv.slice(2)];
  console.log([process.argv[0], ...args].join('\n'));

  let p = spawn(path.join(__dirname, 'node'), args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  });

  p.on('message', data => {
    if (data === 'reset') {
      console.log('Restarting Bot...');
      p.kill();
      start();
      p = null;
    }
  });

  p.on('error', err => {
    console.error('Error occurred:', err);
    if (err.code === 'ENOENT') {
      console.error('Node.js tidak ditemukan. Pastikan Node.js telah terinstal.');
    } else if (err.code === 'EACCES') {
      console.error('Akses ditolak. Pastikan Anda memiliki akses untuk menjalankan Node.js.');
    } else {
      console.error('Error lainnya:', err);
    }
  });

  p.on('exit', code => {
    console.error('Exited with code:', code);
    if (code === 0 || code === 1 || code === '.') {
      start();
    } else {
      console.error('Proses anak berhenti dengan kode error:', code);
    }
  });

  p.on('close', code => {
    console.log('Proses anak telah ditutup dengan kode:', code);
  });

  p.on('disconnect', () => {
    console.log('Proses anak telah terputus.');
  });
}

start();
